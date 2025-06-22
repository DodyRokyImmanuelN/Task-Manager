<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChecklistItem extends Model
{
protected $fillable = [
    'task_id',
    'content',
    'is_completed',
];

    public function task()
{
    return $this->belongsTo(Task::class);
}

}
