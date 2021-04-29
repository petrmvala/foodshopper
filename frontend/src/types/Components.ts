export interface Components {
// all is per 100g
// ENERC [kJ]
  energyKcal: number;
// PROT [g]
  protein: number;
// WATER [g]
  water: number;
// FAT [g]
  fat: number;
// NACL [g]
  salt: number;
// NA [mg]
  sodium: number;
// SUGAR [g]
  sugar: number;
// FIBT [g]
  fibre: number;
// EDIBLE
  edible: number;
// NCF [g]
  nonFibreCarbohydrates: number;
// FATRN [g]
  fattyAcidsTrans: number;
// CHOT [g]
  carbohydrateTotal: number;
// FAPU [g]
  fattyAcidsPolyunsaturated: number;
// ASH [g]
  minerals: number;
// FAMS [g]
  fattyAcidsMonounsaturated: number;
// CHO [g]
  cholesterol: number;
// FACF
  facf: number;
// FASAT [g]
  fattyAcidsSaturated: number;
}

export function emptyComponents(): Components {
  return {
// all is per 100g
// ENERC [kJ]
    energyKcal: 0,
// PROT [g]
    protein: 0,
// WATER [g]
    water: 0,
// FAT [g]
    fat: 0,
// NACL [g]
    salt: 0,
// NA [mg]
    sodium: 0,
// SUGAR [g]
    sugar: 0,
// FIBT [g]
    fibre: 0,
// EDIBLE
    edible: 0,
// NCF [g]
    nonFibreCarbohydrates: 0,
// FATRN [g]
    fattyAcidsTrans: 0,
// CHOT [g]
    carbohydrateTotal: 0,
// FAPU [g]
    fattyAcidsPolyunsaturated: 0,
// ASH [g]
    minerals: 0,
// FAMS [g]
    fattyAcidsMonounsaturated: 0,
// CHO [g]
    cholesterol: 0,
// FACF
    facf: 0,
// FASAT [g]
    fattyAcidsSaturated: 0,
  };
}
