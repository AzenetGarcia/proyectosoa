<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $categories = [
            'Blanco', 'Integral', 'Dulce', 'Artesanal', 'Sin gluten',
            'Regional', 'Enriquecido', 'De molde', 'Crujiente',
            'Dulce relleno', 'Salado', 'Festivo', 'Vegano'
        ];

        $productNames = [
            'Pan de', 'Baguette', 'Concha', 'Cuernito', 'Telera', 'Bolillo',
            'Rosca', 'Panqué', 'Muffin', 'Empanada', 'Churro', 'Dona',
            'Pan de muerto', 'Focaccia', 'Ciabatta', 'Biscuit', 'Scone'
        ];

        for ($i = 1; $i <= 200; $i++) {
            $category = $faker->randomElement($categories);
            $baseName = $faker->randomElement($productNames);
            Product::create([
                'name' => $baseName . ' ' . ($category === 'Blanco' ? 'tradicional' : strtolower($category)),
                'description' => $faker->sentence(10) . ' Ideal para ' . strtolower($category) . '.',
                'price' => $faker->randomFloat(2, 1, 20), // Precios entre 1.00 y 20.00
                'category' => $category,
                'stock' => $faker->numberBetween(5, 50) // Stock típico para una panadería
            ]);
        }
    }
}