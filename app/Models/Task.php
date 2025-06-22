<?php

namespace App\Models;
use App\Models\Project;
use App\Models\Branch;
use App\Models\User;
use App\Models\ChecklistItem; 
use App\Models\Task;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
protected $fillable = [
    'title',
    'description',
    'status',
    'project_id',
    'assigned_to',
    'created_by',
    'from_branch_id',
    'branch_id',
    'due_date',

];

public function project()
{ 
    return $this->belongsTo(Project::class); 
}
public function branch()
{ 
    return $this->belongsTo(Branch::class);     
}
public function fromBranch()
{ 
    return $this->belongsTo(Branch::class, 'from_branch_id'); 
}
public function assignee()
{ 
    return $this->belongsTo(User::class, 'assigned_to'); 
}
public function creator()
{
    return $this->belongsTo(User::class, 'created_by');
}
public function checklistItems()
{ 
    return $this->hasMany(ChecklistItem::class); 
}
}
