import { Component, Input } from '@angular/core';
import { Consulta } from '../../consultas/model/consulta';
import { TipoConsulta } from '../../../enum/TipoConsulta.enum';

@Component({
  selector: 'app-lista-consultas',
  templateUrl: './lista-consultas.component.html',
  styleUrl: './lista-consultas.component.scss',
})
export class ListaConsultasComponent {
  @Input() consultas: Consulta[];

  public tipoConsulta = TipoConsulta;
}
