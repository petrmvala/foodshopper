import {Ingredient} from './Ingredient';

import {Components} from './Components';
import {FFConstants} from '../FFConstants';

export class SelectedIngredient {
  ingredient: Ingredient;
  amount: number;
  contributions: Map<keyof Components, number>;

  constructor(ingredient: Ingredient) {
    this.ingredient = ingredient;
    this.amount = 0;
    this.contributions = new Map<keyof Components, number>();
    FFConstants.ingredientComponents.forEach(componentName => {
      this.contributions.set(componentName as keyof Components, 0);
    });

  }
}

