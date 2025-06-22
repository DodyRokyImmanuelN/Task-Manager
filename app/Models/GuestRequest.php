<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuestRequest extends Model
{
    protected $fillable = [
        'title',
        'description',
        'branch_id',
        'status',
        'guest_name',
        'guest_phone',
    ];

    public function scopeFilter($query, array $filters)
    {
        if ($filters['search'] ?? false) {
            $query->where('name', 'like', '%' . request('search') . '%')
                ->orWhere('email', 'like', '%' . request('search') . '%');
        }
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
}
