package com.foodshopper.foodshopper.ingredient;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(IngredientController.class)
class IngredientControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    public IngredientService ingredientService;
    String baseUrl = "/v1/ingredients";

    @Nested
    class GetAllIngredients {

        @Test
        void shouldReturnAllIngredientsInAnArray() throws Exception {
            when(ingredientService.getAll())
                    .thenReturn(List.of(new Ingredient("mins890", Map.of("Piggy", "Yes"))
                    ));
            mockMvc
                    .perform(get(baseUrl))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(1))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("mins890"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[0].data.Piggy").value("Yes"));

            verify(ingredientService, times(1)).getAll();
        }

    }

    @Nested
    class LoadIngredientsPage {
        @Test
        void shouldReturnPageAndStatus201() throws Exception {
            final Ingredient oxCantEven = new Ingredient(1L, "OxCantEven", Map.of("did stream for the first time ", "true"));
            final Ingredient tramstarzz = new Ingredient(2L, "tramstarzz", Map.of("provider of forbidenn content", "which should not be metioned on stream"));
            final Ingredient lovemequincy101 = new Ingredient(2L, "lovemequincy101", Map.of("feels left out even he is in shower", "true"));

            when(ingredientService.findAllPage(any()))
                    .thenReturn(new PageImpl<>(List.of(oxCantEven, tramstarzz, lovemequincy101)));

            mockMvc.perform(get("/v1/ingredients/page")
                    .param("page", "0")
                    .param("size", "3")
                    .param("sort", "id,desc")
                    .param("sort", "name,asc"))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.size").value(3))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.number").value(0))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.content.size()").value(3));

        }
    }

    @Nested
    class GetIngredientById {

        @Test
        void shouldReturnQueriedIngredientAndStatus200() throws Exception {
            when(ingredientService.getById(1L))
                    .thenReturn(Optional.of(new Ingredient(1L, "JitterTed", Map.of("knows Java", "true"))));
            mockMvc
                    .perform(get(baseUrl + "/1"))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("JitterTed"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.data['knows Java']").value("true"));
        }

        @Test
        void shouldReturn404OnNotFindingIngredient() throws Exception {
            when(ingredientService.getById(123L))
                    .thenReturn(Optional.empty());

            mockMvc.perform(get(baseUrl + "/123"))
                    .andExpect(status().isNotFound());
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
                    .andExpect(status().isCreated())
                    .andExpect(MockMvcResultMatchers.header().string("Location", "/ingredients/1"));
        }

    }

}
