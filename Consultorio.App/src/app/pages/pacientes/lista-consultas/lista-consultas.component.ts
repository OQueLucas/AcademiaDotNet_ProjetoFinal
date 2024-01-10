import { Component, Input } from '@angular/core';
import { Consulta } from '../../consultas/model/consulta';
import { TipoConsulta } from '../../../enum/TipoConsulta.enum';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-lista-consultas',
  templateUrl: './lista-consultas.component.html',
  styleUrl: './lista-consultas.component.scss',
})
export class ListaConsultasComponent {
  @Input() vazio: boolean;
  @Input() consultas: Consulta[];

  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public iterador = 0;
  public linha = new Array(4);
  public coluna = new Array(5);

  public tipoConsulta = TipoConsulta;
}
