import {Component, OnInit} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {Ingredient} from '../../types/Ingredient';
import {Page} from '../../types/Page';

const fakeMap: { [key: string]: string } = {
  ['key1']: 'value1',
  ['ENERC [kcal]']: 'value2'
};

const fakeIngredient = new (class implements Ingredient {
  data: Map<string, string>;
  id: number;
  name: string;

  constructor(data: Map<string, string>, id: number, name: string) {
    this.data = data;
    this.id = id;
    this.name = name;
  }
})(new Map<string, string>([['ENERC [kcal]', 'value1']]), 1, 'this is horrible');

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.sass']
})
export class RequirementsComponent implements OnInit {
  categories: string[] = ['chicken', 'beef', 'vegetables', 'fruits', 'oats'];
  selectedCategories = new Map<string, number>();

  pageSize = 7;

  selectedCategory = '';
  testValue = 50;
  ingredientArray: Ingredient[] = [];
  ingredientPage: Page<Ingredient> = new (class implements Page<Ingredient> {
    content: Ingredient[] = [];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;

    constructor(content: Ingredient[], empty: boolean, first: boolean, last: boolean,
                number: number, numberOfElements: number, page: number, size: number,
                totalElements: number, totalPages: number) {
      this.content = content;
      this.empty = empty;
      this.first = first;
      this.last = last;
      this.number = number;
      this.numberOfElements = numberOfElements;
      this.page = page;
      this.size = size;
      this.totalElements = totalElements;
      this.totalPages = totalPages;
    }
  })(
    [fakeIngredient],
    true, false, false, 0,
    0, 0, 0, 0, 1);


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
      this.ingredientPage.content.forEach(ingredient => {
        const {...origIng} = result.content.find(ing => ing.id === ingredient.id);
        if (this.instanceOfIngredient(origIng)) {
          const entries = Object.entries(origIng.data);
          ingredient.data = new Map<string, string>(entries);
        }
      });
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
      console.log(result);
    });
  }

  loadPreviousPage(): void {
    this.ingredientService.getPage(this.ingredientPage.number - 1, this.pageSize).subscribe(result => {
      this.ingredientPage = result;
      console.log(result);
    });
  }

  loadNextPage(): void {
    this.ingredientService.getPage(this.ingredientPage.number + 1, this.pageSize).subscribe(result => {
      this.ingredientPage = result;
      console.log(result);
    });
  }

  loadLastPage(): void {
    this.ingredientService.getPage(this.ingredientPage.totalPages - 1, this.pageSize).subscribe(result => {
      this.ingredientPage = result;
      console.log(result);
    });

  }

  instanceOfIngredient(object: any): object is Ingredient {
    return object.id != null;
  }

}
