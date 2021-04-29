import {Components, emptyComponents} from './Components';

export interface Requirements {
  required: Components;
  fulfilled: Components;
}

export function emptyRequirements(): Requirements {
  return {
    fulfilled: emptyComponents(),
    required: emptyComponents()
  };
}
