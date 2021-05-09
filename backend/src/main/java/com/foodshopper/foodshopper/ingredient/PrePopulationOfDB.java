package com.foodshopper.foodshopper.ingredient;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.List;
import java.util.Map;

@Component
@AllArgsConstructor
public class PrePopulationOfDB implements CommandLineRunner {

    private final IngredientRepository ingredientRepository;

    @Override
    public void run(String... args) {
        File nutriDatabaze = new File("NutriDatabaze-v7.16-data-export.csv");
        try (BufferedReader reader = new BufferedReader(new FileReader(nutriDatabaze))) {
            String line;
            String[] splitLine;
            String[] columnNames;
            columnNames = reader.readLine().split(";");
            for (int i = 0; i < columnNames.length; i++) {
               columnNames[i] = columnNames[i].strip();
            }
            Ingredient ingredient;

            while (null != (line = reader.readLine())) {
                splitLine = line.split(";");
//  0           1           2           3       4       5       6       7           8               9           10         11            12         13          14          15          16          17          18          19          20          21          22
// OrigFdCd	 OrigFdNm	 EngFdNam	 SciNam	 EDIBLE	 NCF	 FACF	 ENERC [kJ]	 ENERC [kcal]	 FAT [g]	 FASAT [g]	 FAMS [g]	 FAPU [g]	 FATRN [g]	 CHOT [g]	 CHO [g]	 SUGAR [g]	 FIBT [g]	 PROT [g]	 ASH [g]	 NA [mg]	 NACL [g]	 WATER [g]
                ingredient = new Ingredient(Long.parseLong(splitLine[0]), splitLine[2].strip());
                for (int i = 1; i < columnNames.length; i++) {
                    ingredient.addData(columnNames[i], splitLine[i].strip());
                }
                ingredientRepository.save(ingredient);
            }
        } catch (IOException e) {
            e.printStackTrace();
            ingredientRepository.saveAll(List.of(
                    new Ingredient("Chicken", Map.of("Protein per 100g", "A fooking lot")),
                    new Ingredient("not chicken", Map.of("Protein per 100g", "not a lot")),
                    new Ingredient("orange", Map.of("Vitamin C", "fook ton")),
                    new Ingredient("radish", Map.of("Red color per piece", "all over it")),
                    new Ingredient("spinach", Map.of("Iron per 100g", "10x less than claimed by US WW2 propaganda"))));
        }

    }
}
