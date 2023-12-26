import { Genero } from "./enum/Genero.enum";
import { TipoSanguineo } from "./enum/TipoSanguineo.enum";

export class Paciente {
  constructor() {
    this.id = 0;
    this.pessoaId = 0;
    this.nome = "";
    this.nomeSocial = "";
    this.cpf = "";
    this.dataNascimento = new Date;
    this.email = "";
    this.tipoSanguineo = 0;
    this.genero = 0;
    this.cep = "";
    this.bairro = "";
    this.endereco = "";
    this.telefone = "";
    this.observacao = "";
  }

  id?: number;
  pessoaId?: number;
  nome!: string;
  nomeSocial!: string;
  cpf!: string;
  dataNascimento!: Date;
  email!: string;
  tipoSanguineo!: TipoSanguineo;
  genero!: Genero;
  cep!: string;
  bairro!: string;
  endereco!: string;
  telefone!: string;
  observacao!: string;
}
