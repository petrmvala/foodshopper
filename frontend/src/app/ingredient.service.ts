import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Ingredient} from '../types/Ingredient';
import {Page} from '../types/Page';
import {map} from 'rxjs/operators';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = 'http://localhost:8080/v1/ingredients';

  constructor(private httpClient: HttpClient) {
  }

  getAllIngredientsJSON(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.baseUrl);
  }

  getPage(page: number, size: number): Observable<Page<Ingredient>> {
    const params: Params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    return this.httpClient
      .get<Page<Ingredient>>(this.baseUrl + '/page', {params})
      .pipe(map(ingredientPage => {
        this.fillPageIngredientsMaps(ingredientPage);
        return ingredientPage;
        })
      );
  }

  private fillPageIngredientsMaps(ingredientPage: Page<Ingredient>): void {
    ingredientPage.content.forEach(ingredient => {
      ingredient.data = new Map<string, string>(Object.entries(ingredient.data));
    });
  }
}
