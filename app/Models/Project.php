<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'name', 
        'color'
    ];


public function tasks()
{
    return $this->hasMany(Task::class);
}
public function taskLists()
{
    return $this->hasMany(TaskList::class);
}


}
