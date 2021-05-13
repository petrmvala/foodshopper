import {Components, emptyComponents} from './Components';

export interface Requirement{
  required: number;
  fulfilled: number;
}

export interface Requirements {
  required: Map<keyof Components, number>;
  fulfilled: Map<keyof Components, number>;
}

export function emptyRequirements(): Map<keyof Components, Requirement> {
  return new Map<keyof Components, Requirement>();
}
