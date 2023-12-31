export enum Genero {
  Outro = 0,
  Masculino_Cis = 1,
  Masculino_Trans = 2,
  Feminino_Cis = 3,
  Feminino_Trans = 4,
}

export const GeneroToLabelMapping: Record<Genero,string> =  {
  [Genero.Outro]: "Outro",
  [Genero.Masculino_Cis]: "Masculino Cis",
  [Genero.Masculino_Trans]: "Masculino Trans",
  [Genero.Feminino_Cis]: "Feminino Cis",
  [Genero.Feminino_Trans]: "Feminino Trans",
}
