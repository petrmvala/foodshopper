import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ingredient} from '../types/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = 'http://localhost:8080/ingredient';

  constructor(private httpClient: HttpClient) {
  }

  getAllIngredientsJSON(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.baseUrl + '/all');
  }
}
