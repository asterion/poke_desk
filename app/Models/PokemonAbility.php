<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PokemonAbility extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pokemon_ability';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['pokemon_id', 'name'];
}
