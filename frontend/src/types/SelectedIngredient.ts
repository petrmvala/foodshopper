import {Ingredient} from './Ingredient';

export class SelectedIngredient {
  ingredient: Ingredient;
  amount: number;
  contributions: Map<string, number>;

  constructor(ingredient: Ingredient) {
    this.ingredient = ingredient;
    this.amount = 0;
    this.contributions = new Map<string, number>();
    this.ingredient.data.forEach((value, key) => {
      this.contributions.set(key, 0);
    });

  }
}

