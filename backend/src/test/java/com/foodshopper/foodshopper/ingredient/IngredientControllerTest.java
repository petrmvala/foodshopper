package com.foodshopper.foodshopper.ingredient;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@WebMvcTest(IngredientController.class)
class IngredientControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    public IngredientService ingredientService;

    @Test
    void getAllIngredients() throws Exception {
        when(ingredientService.getAll()).thenReturn(List.of(
                new Ingredient("mins890", Map.of("Piggy", "Yes"))
        ));
        this.mockMvc
                .perform(MockMvcRequestBuilders.get("/ingredient/all"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("mins890"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].data.Piggy").value("Yes"));
    }

    @Test
    void getIngregientById() {
    }

    @Test
    void createIngredient() {
    }

    @Test
    void updateIngredient() {
    }

    @Test
    void deleteIngredientById() {
    }
}
