<?php

namespace App\Models;

use App\Models\PokemonAbility;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pokemon extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pokemon';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'base_experience', 'height', 'weight', 'image'];

    public function abilities()
    {
        return $this->hasMany(PokemonAbility::class);
    }
}
