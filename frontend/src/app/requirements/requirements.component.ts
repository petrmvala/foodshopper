import {Component, OnInit} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {Ingredient} from '../../types/Ingredient';
import {Page} from '../../types/Page';

const fakeIngredient: Ingredient = {
  data: new Map<string, string>([['ENERC [kcal]', 'value1']]),
  id: 1,
  name: 'Testing Ingredient'
};

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.sass']
})
export class RequirementsComponent implements OnInit {
  categories: string[] = ['chicken', 'beef', 'vegetables', 'fruits', 'oats'];
  selectedCategories = new Map<string, number>();
  selectedIngredients: Ingredient[] = [];

  pageSize = 7;

  selectedCategory = '';
  testValue = 50;
  ingredientPage: Page<Ingredient> = {
    content: [fakeIngredient],
    empty: false,
    first: true,
    last: false,
    number: 0,
    numberOfElements: 1,
    page: 0,
    size: 1,
    totalElements: 1,
    totalPages: 1
  };

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.selectedCategories.set('test', 55);
    this.getPage();
  }

  addSelectedCategory(category: string): void {
    if (category && !this.selectedCategories.has(category)) {
      this.selectedCategories.set(category, 0);
    }
  }

  getPage(): void {
    this.ingredientService.getPage(0, 7).subscribe(result => {
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
    if (!this.selectedIngredients.find(alreadySelected => alreadySelected.id === ingredient.id)) {
      this.selectedIngredients.push(ingredient);
    }
  }
}
