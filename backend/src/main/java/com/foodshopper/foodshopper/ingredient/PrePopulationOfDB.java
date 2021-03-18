package com.foodshopper.foodshopper.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class PrePopulationOfDB implements CommandLineRunner {
    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public void run(String... args) {

        ingredientRepository.saveAll(List.of(
                new Ingredient("Chicken", Map.of("Protein per 100g", "A fooking lot")),
                new Ingredient("not chicken", Map.of("Protein per 100g", "not a lot")),
                new Ingredient("orange", Map.of("Vitamin C", "fook ton")),
                new Ingredient("radish", Map.of("Red color per piece", "all over it")),
                new Ingredient("spinach", Map.of("Iron per 100g", "10x less than claimed by US WW2 propaganda"))));
    }
}
