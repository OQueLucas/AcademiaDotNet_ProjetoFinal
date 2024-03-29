import { Genero } from '../../../enum/Genero.enum';
import { TipoSanguineo } from '../../../enum/TipoSanguineo.enum';
import { Consulta } from '../../consultas/model/consulta';

export interface Paciente {
  id: number;
  pessoaId: number;
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
  observacao: string;
  consultas: Consulta[];
}
