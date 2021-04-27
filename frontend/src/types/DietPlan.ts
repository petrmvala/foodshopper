import {SelectedIngredient} from './SelectedIngredient';
import {Requirement} from './Requirement';

export interface DietPlan {
  id?: number;
  startDate: Date;
  endDate: Date;
  selectedIngredients: SelectedIngredient[];
  requirements: Requirement[];
}
