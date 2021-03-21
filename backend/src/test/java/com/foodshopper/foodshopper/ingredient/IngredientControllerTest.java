package com.foodshopper.foodshopper.ingredient;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@WebMvcTest(IngredientController.class)
class IngredientControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    public IngredientService ingredientService;
    String baseUrl = "/ingredients";

    @Nested
    class GetAllIngredients {

        @Test
        void shouldReturnAllIngredientsInAnArray() throws Exception {
            when(ingredientService.getAll())
                    .thenReturn(List.of(new Ingredient("mins890", Map.of("Piggy", "Yes"))
                    ));
            mockMvc
                    .perform(MockMvcRequestBuilders.get(baseUrl))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(1))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("mins890"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[0].data.Piggy").value("Yes"));

            verify(ingredientService, times(1)).getAll();
        }

    }

    @Nested
    class GetIngredientById {

        @Test
        void shouldReturnQueriedIngredient() throws Exception {
            when(ingredientService.getById(1L))
                    .thenReturn(new Ingredient(1L, "JitterTed", Map.of("knows Java", "true")));
            mockMvc
                    .perform(MockMvcRequestBuilders.get(baseUrl + "/1"))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("JitterTed"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.data['knows Java']").value("true"));
        }
    }

    @Nested
    class CreateIngredient {

        @Test
        void shouldSaveIngredientAndReturnWithStatus201AndLocationHeaders() throws Exception {
            var tram = new IngredientDTO("tramstarzz", Map.of("have_lag_when_viewing_on_phone", "true"));
            when(ingredientService.save(any(Ingredient.class)))
                    .thenReturn(new Ingredient(1L, "tramstarzz",
                            Map.of("have_lag_when_viewing_on_phone", "true")));
            mockMvc
                    .perform(MockMvcRequestBuilders.post(baseUrl)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(tram)))
            .andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(MockMvcResultMatchers.header().string("Location", "/ingredients/1"));
        }

    }

}
