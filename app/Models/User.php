<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable,HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'branch_id',
        'role',
        'email_verified_at',
        'phone_number',
        'remember_token',
        'created_at',
        'updated_at',
    ];

    public function branch()
{
    return $this->belongsTo(Branch::class);
}

public function assignedTasks()
{
    return $this->hasMany(Task::class, 'assigned_to');
}

public function createdTasks()
{
    return $this->hasMany(Task::class, 'created_by');
}
}
