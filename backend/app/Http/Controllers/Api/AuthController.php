<?php

namespace App\Http\Controllers\Api;

use App\Enums\RewardType;
use App\Enums\UserRole;
use App\Http\Resources\UserResource;
use App\Models\RewardTransaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

/**
 * Auth API — matches frontend pages: Login.jsx, Register.jsx, Profile.jsx
 *
 * Flow for beginners:
 * 1. React sends AJAX POST with email + password
 * 2. Laravel validates the input
 * 3. Laravel checks the database
 * 4. Laravel returns JSON with user + token
 * 5. React saves the token in localStorage
 */
class AuthController extends BaseApiController
{
    /**
     * POST /api/register
     * Used by: frontend/src/pages/Register.jsx
     */
    public function register(Request $request): JsonResponse
    {
        // Step 1: Validate form data from AJAX request
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'phone' => ['nullable', 'string', 'max:20'],
        ]);

        // Step 2: Create new customer in database
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'], // auto-hashed by User model
            'role' => UserRole::Customer,
            'phone' => $data['phone'] ?? null,
        ]);

        // Step 3: Give welcome reward points
        RewardTransaction::create([
            'user_id' => $user->id,
            'points' => 50,
            'type' => RewardType::Bonus,
            'description' => 'Welcome bonus',
        ]);
        $user->update(['reward_points' => 50]);

        // Step 4: Create API token (Sanctum) for AJAX requests
        $token = $user->createToken('auth-token')->plainTextToken;

        // Step 5: Send JSON back to React
        return $this->success('Welcome to Brew & Bloom!', [
            'user' => new UserResource($user->fresh()),
            'token' => $token,
        ], 201);
    }

    /**
     * POST /api/login
     * Used by: frontend/src/pages/Login.jsx
     */
    public function login(Request $request): JsonResponse
    {
        // Step 1: Validate email and password from AJAX
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Step 2: Find user by email
        $user = User::where('email', $credentials['email'])->first();

        // Step 3: Check password (returns error if wrong)
        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The email or password is incorrect.'],
            ]);
        }

        // Step 4: Create token for this login session
        $token = $user->createToken('auth-token')->plainTextToken;

        // Step 5: Send user + token to React
        return $this->success('Login successful.', [
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    /**
     * POST /api/logout
     * Used by: frontend/src/components/layout/Navbar.jsx
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success('Logged out successfully.');
    }

    /**
     * GET /api/me
     * Used by: frontend/src/context/AuthContext.jsx (on page refresh)
     */
    public function me(Request $request): JsonResponse
    {
        return $this->success('User loaded.', [
            'user' => new UserResource($request->user()),
        ]);
    }

    /**
     * PUT /api/profile
     * Used by: frontend/src/pages/Profile.jsx
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
            'avatar' => ['nullable', 'string', 'max:500'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return $this->success('Profile updated successfully.', [
            'user' => new UserResource($user->fresh()),
        ]);
    }
}
