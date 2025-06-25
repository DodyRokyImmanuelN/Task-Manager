<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChecklistItem extends Model
{
    protected $fillable = ['task_id', 'item', 'is_checked'];

    public $timestamps = false;

    protected $casts = [
        'is_checked' => 'boolean',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
