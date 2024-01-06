import { inject } from '@angular/core';
import { LocalStorageUtils } from '../../utils/localstorage';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';

export const CanDeactivate: CanDeactivateFn<CadastroComponent> = (
  component: CadastroComponent
) => {
  if (component.mudancasNaoSalvas) {
    return window.confirm(
      'Tem certeza que deseja abandonar o preenchimento do formulário?'
    );
  }
  return true;
};

export const canActivate: CanActivateFn = () => {
  let localStorageUtils = new LocalStorageUtils();
  if (localStorageUtils.obterTokenUsuario()) {
    inject(Router).navigate(['/home']);
  }
  return true;
};
