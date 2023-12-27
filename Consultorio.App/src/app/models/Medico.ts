import { Genero } from "./enum/Genero.enum";
import { TipoSanguineo } from "./enum/TipoSanguineo.enum";

export class Medico {
  constructor() {
    this.id = 0;
    this.pessoaId = 0;
    this.crm = "";
    this.especializacao = "";
    this.nome = "";
    this.nomeSocial = "";
    this.cpf = "";
    this.dataNascimento = new Date;
    this.email = "";
    this.tipoSanguineo = null;
    this.genero = null;
    this.cep = "";
    this.bairro = "";
    this.endereco = "";
    this.telefone = "";
  }

  id?: number;
  pessoaId?: number;
  crm: string;
  especializacao: string;
  nome: string;
  nomeSocial: string;
  cpf: string;
  dataNascimento: Date;
  email: string;
  tipoSanguineo: TipoSanguineo;
  genero: Genero;
  cep: string;
  bairro: string;
  endereco: string;
  telefone: string;
}
