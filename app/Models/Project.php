<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'branch_id',
    ];

    public function branch()
{
    return $this->belongsTo(Branch::class);
}

public function tasks()
{
    return $this->hasMany(Task::class);
}

}
