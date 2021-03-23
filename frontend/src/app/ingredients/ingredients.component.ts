import {Component, OnInit} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {Ingredient} from '../../types/Ingredient';

const defaultIngredientArray = [new class implements Ingredient {
  data: Map<string, string> = new Map([
    ['key1', 'value1'],
    ['key2', 'value2']
  ]);
  id = -1;
  name = 'Not loaded or after reset';
}()];

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.sass']
})
export class IngredientsComponent implements OnInit {

  ingredientArray: Ingredient[] = defaultIngredientArray;

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
  }

  getAllIngredientsJSON(): void {
    this.ingredientService.getAllIngredientsJSON().subscribe((result) => {
      this.ingredientArray = result;
    });
  }

  resetIngredients(): void {
    this.ingredientArray = defaultIngredientArray;
  }

}
