import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Ingredient} from '../types/Ingredient';
import {Page} from '../types/Page';
import {map} from 'rxjs/operators';
import {Params} from '@angular/router';
import {NutridatabazeIngredientMapper} from '../types/NutridatabazeIngredientMapper';

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
          ingredientPage.content.forEach((ingredient) => {
            NutridatabazeIngredientMapper.mapIngredient(ingredient);
          });
          return ingredientPage;
        })
      );
  }

}
