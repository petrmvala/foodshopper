import {Ingredient} from './types/Ingredient';

type mappingType = {
  [key: string]: keyof Ingredient;
};

export class FFConstants {
  public static componentsMapping: mappingType = {
    'ENERC [kJ]': 'energyKcal',
    'PROT [g]': 'protein',
    'WATER [g]': 'water',
    'FAT [g]': 'fat',
    'NACL [g]': 'salt',
    'NA [mg]': 'sodium',
    'SUGAR [g]': 'sugar',
    'FIBT [g]': 'fibre',
    EDIBLE: 'edible',
    'NCF [g]': 'nonFibreCarbohydrates',
    'FATRN [g]': 'fattyAcidsTrans',
    'CHOT [g]': 'carbohydrateTotal',
    'FAPU [g]': 'fattyAcidsPolyunsaturated',
    'ASH [g]': 'minerals',
    'FAMS [g]': 'fattyAcidsMonounsaturated',
    'CHO [g]': 'cholesterol',
    FACF: 'facf',
    'FASAT [g]': 'fattyAcidsSaturated',
  };

  public static ingredientComponents = [
    'energyKcal',
    'protein',
    'water',
    'fat',
    'salt',
    'sodium',
    'sugar',
    'fibre',
    'edible',
    'nonFibreCarbohydrates',
    'fattyAcidsTrans',
    'carbohydrateTotal',
    'fattyAcidsPolyunsaturated',
    'minerals',
    'fattyAcidsMonounsaturated',
    'cholesterol',
    'facf',
    'fattyAcidsSaturated'];
}
