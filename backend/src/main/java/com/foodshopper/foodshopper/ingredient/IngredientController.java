package com.foodshopper.foodshopper.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/ingredient")
public class IngredientController {
    private IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }


    @GetMapping("all")
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAll();
    }

    @GetMapping(path = "/one/{id}")
    public Ingredient getIngregientById(@PathVariable("id") Long id) {
        return ingredientService.getById(id);
    }

    @PostMapping("post")
    public void createIngredient(@RequestBody Ingredient ingredient) {
        ingredientService.saveOne(ingredient);
    }

    @PutMapping("/put")
    public void updateIngredient(@RequestBody Ingredient ingredient ) {
        ingredientService.saveOne(ingredient);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteIngredientById(@PathVariable("id") Long id){
       ingredientService.deleteOne(id);
    }

}
