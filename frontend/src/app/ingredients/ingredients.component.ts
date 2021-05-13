import {Component, OnInit} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {Ingredient} from '../../types/Ingredient';

const defaultIngredientArray: Ingredient[] = [];

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
