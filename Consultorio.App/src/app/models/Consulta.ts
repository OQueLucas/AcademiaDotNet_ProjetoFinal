import { TipoConsulta } from "./enum/TipoConsulta.enum"

export class Consulta {
  constructor() {
    this.id = 0,
    this.tipoConsulta = null,
    this.descricao = "",
    this.data = new Date,
    this.medicoId = 0,
    this.medicoCRM = "",
    this.especializacao = "",
    this.medicoNome = "",
    this.medicoNomeSocial = "",
    this.pacienteId = 0,
    this.nome = "",
    this.nomeSocial = "",
    this.cpf = "",
    this.dataNascimento = new Date,
    this.email = "",
    this.telefone = "",
    this.tipoSanguineo = 0,
    this.genero = 0,
    this.sintomas = [{
      sintomaId: 0,
      nome: "",
    }]
  }

  id?: number;
  tipoConsulta: TipoConsulta;
  descricao: string;
  data: Date;
  medicoId?: number;
  medicoCRM?: string;
  especializacao?: string;
  medicoNome?: string;
  medicoNomeSocial?: string;
  pacienteId: number;
  nome?: string;
  nomeSocial?: string;
  cpf?: string;
  dataNascimento?: Date;
  email?: string;
  telefone?: string;
  tipoSanguineo?: number;
  genero?: number;
  sintomas?: [
    {
      sintomaId: number,
      nome: string
    }
  ]
}
