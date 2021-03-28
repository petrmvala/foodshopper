package com.foodshopper.foodshopper.ingredient;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.HashMap;
import java.util.Map;

@Entity
@TypeDef(name = "json", typeClass = JsonStringType.class)
@Getter
@Setter
@AllArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @Type(type = "json")
    private Map<String, String> data;

    public Ingredient() {
        data = new HashMap<>();
    }

    public Ingredient(String name, Map<String, String> data) {
        this.name = name;
        this.data = data;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", data=" + data +
                '}';
    }
}
