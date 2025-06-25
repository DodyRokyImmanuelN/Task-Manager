<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('checklist_items', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->string('item');
            $table->boolean('is_checked')->default(false);
            $table->timestamps();
});

    }
    public function down()
    {
        Schema::dropIfExists('checklist_items');
    }
};
