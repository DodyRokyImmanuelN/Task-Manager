<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{

    protected $fillable = [
        'name',
        
    ];

    public function users()
{
    return $this->hasMany(User::class);
}

public function projects()
{
    return $this->hasMany(Project::class);
}

public function incomingTasks()
{
    return $this->hasMany(Task::class, 'branch_id');
}

public function sentTasks()
{
    return $this->hasMany(Task::class, 'from_branch_id');
}

}
