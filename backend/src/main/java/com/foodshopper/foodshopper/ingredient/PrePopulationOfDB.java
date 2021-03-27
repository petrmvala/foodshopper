package com.foodshopper.foodshopper.ingredient;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@Component
@AllArgsConstructor
public class PrePopulationOfDB implements CommandLineRunner {

    private final IngredientRepository ingredientRepository;

    @Override
    public void run(String... args) throws IOException {
        File nutriDatabaze = new File("NutriDatabaze-v7.16-data-export.csv");
        try (BufferedReader reader = new BufferedReader(new FileReader(nutriDatabaze))) {
            String line;
            String[] splitLine;
            String[] columnNames;
            columnNames = reader.readLine().split(";");
            Ingredient ingredient;

            while (null != (line = reader.readLine())) {
                splitLine = line.split(";");
//  0           1           2           3       4       5       6       7           8               9           10         11            12         13          14          15          16          17          18          19          20          21          22
// OrigFdCd	 OrigFdNm	 EngFdNam	 SciNam	 EDIBLE	 NCF	 FACF	 ENERC [kJ]	 ENERC [kcal]	 FAT [g]	 FASAT [g]	 FAMS [g]	 FAPU [g]	 FATRN [g]	 CHOT [g]	 CHO [g]	 SUGAR [g]	 FIBT [g]	 PROT [g]	 ASH [g]	 NA [mg]	 NACL [g]	 WATER [g]
                ingredient = new Ingredient(Long.parseLong(splitLine[0]), splitLine[2]);
                for (int i = 1; i < columnNames.length; i++) {
                    ingredient.addData(columnNames[i], splitLine[i]);
                }
                ingredientRepository.save(ingredient);
            }
        }

    }
}
