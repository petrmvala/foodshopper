import {Components} from './Components';

export interface Ingredient extends Components {
  // missing czech name, sci name
  id: number;
  name: string;
  data: { key: string, value: string };
  components: Components;
}
