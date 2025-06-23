<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MonitorController extends Controller
{
    public function index()
    {
        return Inertia::render('Monitor/Tasks/Index');
    }
}
