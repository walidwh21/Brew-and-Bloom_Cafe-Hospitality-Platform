<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

/**
 * RESERVATIONS ADMIN — http://localhost:8000/admin/reservations
 */
class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::latest()->get();

        return view('admin.reservations.index', compact('reservations'));
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required']);

        $reservation = Reservation::findOrFail($id);
        $reservation->status = $request->status;
        $reservation->save();

        return back()->with('success', 'Reservation updated.');
    }

    public function destroy($id)
    {
        Reservation::findOrFail($id)->delete();

        return back()->with('success', 'Reservation deleted.');
    }
}
