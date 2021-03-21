package com.foodshopper.foodshopper.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/v1/ingredients")
@CrossOrigin(origins = "http://localhost:4200")
public class IngredientController {
    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Ingredient getIngredientById(@PathVariable("id") Long id) {
        return ingredientService.getById(id);
    }

    @PostMapping
    public ResponseEntity<String> createIngredient(@RequestBody IngredientDTO ingredientDTO) {
        Ingredient ing = ingredientService.save(ingredientDTO.createIngredient());
        return ResponseEntity.created(URI.create("/ingredients/" + ing.getId())).build();
    }

    @PutMapping(path = "/{id}")
    public void updateIngredient(@RequestBody IngredientDTO ingredientDTO) {
        // send error when not updated?
        ingredientService.save(ingredientDTO.createIngredient());
    }

    @DeleteMapping("/{id}")
    public void deleteIngredientById(@PathVariable("id") Long id) {
        ingredientService.delete(id);
    }

}
