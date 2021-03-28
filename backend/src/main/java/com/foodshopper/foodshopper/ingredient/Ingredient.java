package com.foodshopper.foodshopper.ingredient;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
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
    @Column(length = 1000)
    private Map<String, String> data;

    public Ingredient() {
        data = new HashMap<>();
    }

    public Ingredient(Long id, String name) {
        this();
        this.id = id;
        this.name = name;
    }

    public Ingredient(String name, Map<String, String> data) {
        this.name = name;
        this.data = data;
    }

    public void addData(String key, String value) {
        data.put(key, value);
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
