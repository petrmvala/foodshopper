import {Component} from '@angular/core';
import {IngredientService} from './ingredient.service';
import {Ingredient} from '../types/Ingredient';

const defaultIngredientArray = [new class implements Ingredient {
  data: Map<string, string> = new Map([
    ['key1', 'value1'],
    ['key2', 'value2']
  ]);
  id = -1;
  name = 'Not loaded or after reset';
}()];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FoodShopper';
  ingredientArray: Ingredient[] = defaultIngredientArray;

  constructor(private ingredientService: IngredientService) {
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
