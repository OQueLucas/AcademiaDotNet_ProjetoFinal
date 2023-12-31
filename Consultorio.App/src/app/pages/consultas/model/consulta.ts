import { Genero } from '../../../enum/Genero.enum';
import { TipoConsulta } from '../../../enum/TipoConsulta.enum';
import { TipoSanguineo } from '../../../enum/TipoSanguineo.enum';
import { SintomaConsulta } from './sintomaConsulta';

export interface Consulta {
  id: number;
  tipoConsulta: TipoConsulta;
  descricao: string;
  data: Date;
  medicoId: number;
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
  tipoSanguineo: TipoSanguineo;
  genero: Genero;
  sintomas?: SintomaConsulta[];
}
