import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ingredient} from '../types/Ingredient';
import {Page} from '../types/Page';
import {map} from 'rxjs/operators';

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
    return this.httpClient.get<Page<Ingredient>>(this.baseUrl + '/page' + '?page=' + page + '&size=' + size)
      .pipe(map(ingredientPage => {
          ingredientPage.content.forEach(ingredient => {
            ingredient.data = new Map<string, string>(Object.entries(ingredient.data));
          });
          return ingredientPage;
        })
      );
  }
}
