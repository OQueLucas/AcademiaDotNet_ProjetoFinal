import { Component } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-acesso-negado',
  templateUrl: './acesso-negado.component.html',
  styleUrl: './acesso-negado.component.scss',
})
export class AcessoNegadoComponent {
  public acessoNegadoIcon = icon({ prefix: 'fas', iconName: 'xmark' });
  public bloqueadoIcon = icon({ prefix: 'fas', iconName: 'lock' });
}
