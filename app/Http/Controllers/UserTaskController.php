<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserTaskController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Tasks/Index');
    }
}
