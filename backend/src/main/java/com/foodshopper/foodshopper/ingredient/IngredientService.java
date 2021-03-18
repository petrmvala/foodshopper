package com.foodshopper.foodshopper.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public void saveOne(Ingredient ingredient){
        ingredientRepository.save(ingredient);
    }

    public List<Ingredient> getAll() {
        return ingredientRepository.findAll();
    }

    public Ingredient getById(Long id) {
        // TODO check if it is in DB
        return ingredientRepository.findById(id).get();
    }

    public void deleteOne(Long id) {
        ingredientRepository.deleteById(id);
    }
}
