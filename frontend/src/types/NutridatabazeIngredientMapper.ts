import {Components, emptyComponents} from './Components';
import {Ingredient} from './Ingredient';


export class NutridatabazeIngredientMapper {
  public static readonly mapping: { [key: string]: keyof Components } = {
    'ENERC [kcal]': 'energyKcal',
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

  public static mapIngredient(ingredient: Ingredient): void {
    ingredient.components = emptyComponents();
    Object.entries(ingredient.data)
      .forEach(([key, value]) => {
      if (this.mapping.hasOwnProperty(key)) {
        ingredient.components[this.mapping[key]] = +value;
      }
    });
  }

}
