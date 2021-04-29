import {SelectedIngredient} from './SelectedIngredient';
import {emptyRequirements, Requirements} from './Requirements';

export interface DietPlan {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  selectedIngredients: SelectedIngredient[];
  requirements: Requirements;
}

export function emptyDietPlan(): DietPlan {
  return {
    name: '',
    endDate: new Date(),
    id: 0,
    requirements: emptyRequirements(),
    selectedIngredients: [],
    startDate: new Date()
  };
}
