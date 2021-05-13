import {SelectedIngredient} from './SelectedIngredient';
import {emptyRequirements, Requirement} from './Requirements';
import {Components} from './Components';

export interface DietPlan {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  selectedIngredients: SelectedIngredient[];
  requirements: Map<keyof Components, Requirement>;
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
