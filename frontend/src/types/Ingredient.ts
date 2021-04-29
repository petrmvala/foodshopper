import {Components} from './Components';

export interface Ingredient extends Components{
  id: number;
  name: string;
  data: Map<string, string>;
}
