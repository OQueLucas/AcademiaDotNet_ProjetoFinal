export enum TipoSanguineo {
  Nao_Informado = 0,
  O_Positivo = 1,
  O_Negativo = 2,
  A_Positivo = 3,
  A_Negativo = 4,
  B_Positivo = 5,
  B_negativo = 6,
  AB_Positivo = 7,
  AB_Negativo = 8,
}

export const TipoSanguineoToLabelMapping: Record<TipoSanguineo,string> =  {
  [TipoSanguineo.Nao_Informado]: "Não Informado",
  [TipoSanguineo.O_Positivo]: "O Positivo",
  [TipoSanguineo.O_Negativo]:  "O Negativo",
  [TipoSanguineo.A_Positivo]:  "A Positivo",
  [TipoSanguineo.A_Negativo]:  "A Negativo",
  [TipoSanguineo.B_Positivo]:  "B Positivo",
  [TipoSanguineo.B_negativo]:  "B negativo",
  [TipoSanguineo.AB_Positivo]: "AB Positivo",
  [TipoSanguineo.AB_Negativo]: "AB Negativo",
}
