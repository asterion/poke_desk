<?php

namespace App\Console\Commands;

use App\Models\Pokemon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class PokeApiGet extends Command
{
    public const LIMIT = 100;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:poke {cantidad=' . self::LIMIT . '}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Descargar informacion necesaria de los pokemones desde https://pokeapi.co';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $limit = (int)$this->argument('cantidad');
        $limit = ($limit < 1 || $limit > self::LIMIT) ? self::LIMIT : $limit;

        try {
            $this->info('Inicio: por favor espere unos segundos...');
            $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=' . $limit);
            if ($response->ok()) {
                $results = $response->json();

                foreach($results['results'] as $pokemon) {
                    $response = Http::get($pokemon['url'] );
                    $pokemon = $response->json();

                    // 'abilities : ' . print_r($pokemon['abilities'], true),

                    $pokemon = Pokemon::updateOrCreate(
                        ['name' => $pokemon['name']],
                        [
                            'base_experience' => $pokemon['base_experience'],
                            'height' => $pokemon['height'],
                            'weight' => $pokemon['weight'],
                            'image' => $pokemon['sprites']['other']['dream_world']['front_default'],
                        ]
                    );

                    $this->info(sprintf('pokemon "%s" actualizado correctamente.', $pokemon->name));
                }
            }
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        }

        return 1;
    }
}
