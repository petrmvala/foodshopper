import {SelectedIngredient} from './SelectedIngredient';
import {Requirement} from './Requirement';

export interface DietPlan {
  id?: number;
  startDate: Date;
  endDate: Date;
  selectedIngredients: SelectedIngredient[];
  requirements: Requirement[];
}

export function emptyDietPlan(): DietPlan {
  return {
    endDate: new Date(), id: 0, requirements: [], selectedIngredients: [], startDate: new Date()
  };
}
