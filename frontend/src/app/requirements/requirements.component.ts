import {Component, OnInit} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {Ingredient} from '../../types/Ingredient';
import {emptyPage} from '../../types/Page';
// import {emptyRequirements, Requirements} from '../../types/Requirements';
import {DietPlan, emptyDietPlan} from '../../types/DietPlan';
import {Components} from '../../types/Components';
import {Requirement} from '../../types/Requirements';
import {FFConstants} from '../../FFConstants';
import {SelectedIngredient} from '../../types/SelectedIngredient';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.sass']
})
export class RequirementsComponent implements OnInit {
  selectedCategories = new Map<string, number>();
  ingredientsSelected: Ingredient[] = [];
  ingredientsPlannedAmount = new Map<number, number>();
  visibleColumns = new Set<string>();
  selectableColumns = FFConstants.ingredientComponents;
  requirementNameSelected = this.selectableColumns[0];

  pageSize = 7;

  dietPlan: DietPlan = {
    name: 'DietPlan1',
    endDate: new Date(1900, 0, 16, 11, 22, 33, 44),
    id: 1,
    requirements: new Map<keyof Components, Requirement>(),
    selectedIngredients: [],
    startDate: new Date(1900, 1, 1, 1, 1, 1, 1)
  };

  dietPlan2: DietPlan = {
    name: 'DietPlan2',
    endDate: new Date(2000, 0, 16, 11, 22, 33, 44),
    id: 2,
    requirements: new Map<keyof Components, Requirement>(),
    selectedIngredients: [],
    startDate: new Date(2000, 1, 1, 1, 1, 1, 1)
  };

  fakeDietPlans: DietPlan[] = [this.dietPlan, this.dietPlan2];
  selectedCategory = '';
  testValue = 50;
  ingredientPage = emptyPage<Ingredient>();
  selectedDietPlan: DietPlan = this.fakeDietPlans[0];

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.selectedCategories.set('test', 55);
    this.getPage(0);
  }

  addSelectedCategory(category: string): void {
    if (category && !this.selectedCategories.has(category)) {
      this.selectedCategories.set(category, 0);
    }
  }

  getPage(page: number): void {
    this.ingredientService.getPage(page, 7).subscribe(result => {
      this.ingredientPage = result;
    });
  }

  updateMap(key: string, value: number): void {
    if (value > 100) {
      value = 100;
    }
    if (value < 0) {
      value = 0;
    }
    this.selectedCategories.set(key, value);
  }

  loadFirstPage(): void {
    this.ingredientService.getPage(0, this.pageSize).subscribe(result => {
      this.ingredientPage = result;
    });
  }

  loadPreviousPage(): void {
    this.ingredientService.getPage(this.ingredientPage.number - 1, this.pageSize).subscribe(result => {
      this.ingredientPage = result;
    });
  }

  loadNextPage(): void {
    this.ingredientService.getPage(this.ingredientPage.number + 1, this.pageSize).subscribe(result => {
      this.ingredientPage = result;
    });
  }

  loadLastPage(): void {
    this.ingredientService.getPage(this.ingredientPage.totalPages - 1, this.pageSize).subscribe(result => {
      this.ingredientPage = result;
    });
  }

  selectIngredient(ingredient: Ingredient): void {
    if (!this.selectedDietPlan.selectedIngredients.find(alreadySelected => alreadySelected.ingredient.id === ingredient.id)) {
      this.selectedDietPlan.selectedIngredients.push(new SelectedIngredient(ingredient));
    }
  }

  toggleColumnVisibility(columnName: string): void {
    if (this.visibleColumns.has(columnName)) {
      this.visibleColumns.delete(columnName);
    } else {
      this.visibleColumns.add(columnName);
    }
  }

  addRequirement(): void {
    this.selectedDietPlan.requirements.set(this.requirementNameSelected as keyof Components,
      {fulfilled: 0, required: 0}
    );
  }

  setIngredientAmount(id: number, event: any): void {
    if (event?.target?.value === null) {
      console.log('setIngredientAmount have been called with null value in event');
    } else {
      this.ingredientsPlannedAmount.set(id, event.target.valueAsNumber);
    }
  }

  getIngredientColumnValue(ingredient: Ingredient, columnName: string): number {
   return ingredient.components[columnName as keyof Components];
  }

}
