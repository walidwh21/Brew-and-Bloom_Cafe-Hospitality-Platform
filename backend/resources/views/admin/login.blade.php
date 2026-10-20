<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login — Brew & Bloom</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Georgia, serif; background: #faf6f0; min-height: 100vh; display: flex; align-items: center; justify-content: center; color: #2c1810; }
        .box { background: #fff; padding: 40px; border-radius: 16px; width: 100%; max-width: 420px; box-shadow: 0 4px 24px rgba(44,24,16,.08); border: 1px solid rgba(44,24,16,.05); }
        .box small { color: #c9a962; letter-spacing: 3px; font-size: 10px; text-transform: uppercase; }
        .brand-logo-login img { height: 88px; width: auto; display: block; margin: 0 auto; }
        label { display: block; margin-bottom: 6px; font-size: 14px; }
        input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 16px; font-size: 14px; }
        button { width: 100%; padding: 12px; background: #2c1810; color: #faf6f0; border: none; border-radius: 999px; cursor: pointer; font-size: 15px; }
        button:hover { background: #4a3228; }
        .alert { padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 14px; background: #ffebee; color: #c62828; }
        .hint { margin-top: 20px; padding: 16px; background: #f0e8dc; border-radius: 8px; font-size: 13px; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="box">
        <div class="brand-logo-login">
            <img src="{{ asset('images/logo-mark.svg') }}" alt="Brew & Bloom">
        </div>
        <h1 style="font-weight:normal;font-size:22px;margin:0 0 24px;text-align:center">Admin Login</h1>
        <p style="color:#666;font-size:14px;margin-bottom:24px">Sign in to manage your café from the backend.</p>

        @if(session('error'))
            <div class="alert">{{ session('error') }}</div>
        @endif

        <form method="POST" action="/admin/login">
            @csrf
            <label>Email</label>
            <input type="email" name="email" value="{{ old('email') }}" required autofocus>

            <label>Password</label>
            <input type="password" name="password" required>

            <label style="display:flex;align-items:center;gap:8px;margin-bottom:20px">
                <input type="checkbox" name="remember" style="width:auto;margin:0"> Remember me
            </label>

            <button type="submit">Sign In to Admin</button>
        </form>

        <div class="hint">
            <strong>Demo login:</strong><br>
            Email: admin@example.com<br>
            Password: password
        </div>
    </div>
</body>
</html>
