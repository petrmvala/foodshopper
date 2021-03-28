package com.foodshopper.foodshopper.ingredient;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@AllArgsConstructor
@Getter
public class IngredientDTO {
    private String name;
    private Map<String, String> data;

    public Ingredient createIngredient() {
        return new Ingredient(this.name, this.data);
    }
}
