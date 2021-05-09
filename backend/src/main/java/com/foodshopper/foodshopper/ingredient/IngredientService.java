package com.foodshopper.foodshopper.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {
    private IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Ingredient save(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public List<Ingredient> getAll() {
        return ingredientRepository.findAll();
    }

    public Optional<Ingredient> getById(Long id) {
        return ingredientRepository.findById(id);
    }

    public void delete(Long id) {
        ingredientRepository.deleteById(id);
    }

    public Page<Ingredient> findAllPage(Pageable pageable) {
        return ingredientRepository.findAll(pageable);
    }
}
