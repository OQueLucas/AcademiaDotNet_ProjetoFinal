import { TipoConsulta } from "./enum/TipoConsulta.enum"

export interface Consulta {
  id: number;
  tipoConsulta: TipoConsulta;
  descricao: string;
  data: Date;
  medicoCRM: string;
  especializacao: string;
  medicoNome: string;
  medicoNomeSocial: string;
  pacienteId: number;
  nome: string;
  nomeSocial: string;
  cpf: string;
  dataNascimento: Date;
  email: string;
  tipoSanguineo: number;
  genero: number;
  sintomas: [
    {
      sintomaId: number,
      nome: string
    }
  ]
}