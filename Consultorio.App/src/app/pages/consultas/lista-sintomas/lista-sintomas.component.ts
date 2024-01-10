import { Component, Input } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Sintoma } from '../../sintomas/model/sintoma';

@Component({
  selector: 'app-lista-sintomas',
  templateUrl: './lista-sintomas.component.html',
  styleUrl: './lista-sintomas.component.scss',
})
export class ListaSintomasComponent {
  @Input() vazio: boolean;
  @Input() sintomas: Sintoma[];

  public detalheIcon = icon({ prefix: 'fas', iconName: 'list' });
  public editarIcon = icon({ prefix: 'fas', iconName: 'pen-to-square' });
  public excluirIcon = icon({ prefix: 'fas', iconName: 'trash-can' });
  public novoIcon = icon({ prefix: 'fas', iconName: 'plus' });

  public iterador = 0;
  public linha = new Array(4);
  public coluna = new Array(5);
}
