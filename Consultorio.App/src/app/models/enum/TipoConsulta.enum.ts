export enum TipoConsulta {
  Rotina = 1,
  Checkup = 2,
  Retorno = 3,
}

export const TipoConsultaToLabelMapping: Record<TipoConsulta,string> =  {
  [TipoConsulta.Rotina]: "Rotina",
  [TipoConsulta.Checkup]: "Checkup",
  [TipoConsulta.Retorno]: "Retorno",
}
