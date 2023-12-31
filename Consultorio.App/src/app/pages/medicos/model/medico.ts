import { Genero } from '../../../enum/Genero.enum';
import { TipoSanguineo } from '../../../enum/TipoSanguineo.enum';

export interface Medico {
  id: number;
  pessoaId: number;
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
