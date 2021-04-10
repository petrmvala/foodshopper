import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ingredient} from '../types/Ingredient';
import {Page} from '../types/Page';

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

  instanceOfIngredient(object: any): object is Ingredient {
    return object.id != null;
  }

  getPage(page: number, size: number): Observable<Page<Ingredient>> {
    return new Observable<Page<Ingredient>>((observer: Observer<Page<Ingredient>>) => {
      this.httpClient.get<Page<Ingredient>>(this.baseUrl + '/page' + '?page=' + page + '&size=' + size)
        .subscribe(ingredientPage => {
          ingredientPage.content.forEach(ingredient => {
            if (this.instanceOfIngredient(ingredient)) {
              ingredient.data = new Map<string, string>(Object.entries(ingredient.data));
            }
          });
          observer.next(ingredientPage);
        });
    });
  }
}
