import {Component, OnInit} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {Ingredient} from '../../types/Ingredient';
import {Page} from '../../types/Page';
import {Requirement} from '../../types/Requirement';

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
  ingredientsSelected: Ingredient[] = [];
  ingredientsPlannedAmount = new Map<number, number>();
  visibleColumns = new Set<string>();
  selectableColumns: string[] = [];
  requirements = new Map<string, Requirement>();
  requirementNameSelected = 'first one';

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
    this.getPage(0);
  }

  setSelectableColumns(columnsNames: string[]): void {
    this.selectableColumns = columnsNames;
  }

  addSelectedCategory(category: string): void {
    if (category && !this.selectedCategories.has(category)) {
      this.selectedCategories.set(category, 0);
    }
  }

  getPage(page: number): void {
    this.ingredientService.getPage(page, 7).subscribe(result => {
      this.ingredientPage = result;
      const columnsNames = Array.from(this.ingredientPage.content[1].data.keys());
      this.setSelectableColumns(columnsNames);
      this.requirementNameSelected = columnsNames[0];
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
    if (!this.ingredientsSelected.find(alreadySelected => alreadySelected.id === ingredient.id)) {
      this.ingredientsSelected.push(ingredient);
      this.ingredientsPlannedAmount.set(ingredient.id, 0);
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
    this.requirements.set(this.requirementNameSelected,
      {name: this.requirementNameSelected, fulfilled: 0, required: 0}
    );
  }

  setIngredientAmount(id: number, event: any): void {
    if (event?.target?.value === null) {
      console.log('setIngredientAmount have been called with null value in event');
    } else {
      this.ingredientsPlannedAmount.set(id, event.target.valueAsNumber);
    }
  }
}
