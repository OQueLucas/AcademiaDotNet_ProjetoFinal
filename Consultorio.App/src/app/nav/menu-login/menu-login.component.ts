import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from '../../utils/localstorage';

import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrl: './menu-login.component.scss',
})
export class MenuLoginComponent {
  token: string = '';
  user: any;
  email: string = '';
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  public loginIcon = icon({ prefix: 'fas', iconName: 'right-to-bracket' });
  public logoutIcon = icon({ prefix: 'fas', iconName: 'right-from-bracket' });
  public registrarIcon = icon({ prefix: 'fas', iconName: 'user-plus' });

  public usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user) this.email = this.user.email;

    return this.token !== null;
  }

  public logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);
  }
}
