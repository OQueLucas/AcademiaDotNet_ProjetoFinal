import { TipoConsulta } from "./enum/TipoConsulta.enum"

export class Consulta {
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
  telefone: string;
  tipoSanguineo: number;
  genero: number;
  sintomas: [
    {
      sintomaId: number,
      nome: string
    }
  ]
}
