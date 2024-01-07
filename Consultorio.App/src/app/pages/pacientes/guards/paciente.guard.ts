import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageUtils } from '../../../utils/localstorage';
import { CanDeactivateFn } from '@angular/router';
import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

export const canActivate: CanActivateFn = (
  routeAc: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localStorageUtils = new LocalStorageUtils();
  if (!localStorageUtils.obterTokenUsuario()) {
    inject(Router).navigate(['/conta/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  let user = localStorageUtils.obterUsuario();
  let claim: any = routeAc.data[0];

  if (claim !== undefined) {
    let claim = routeAc.data[0]['claim'];

    if (claim) {
      if (!user.claims) {
        navegarAcessoNegado();
      }

      let userClaims = user.claims.find((x) => x.type === claim.nome);
      if (!userClaims) {
        navegarAcessoNegado();
      }

      let valoresClaim = userClaims.value as string;

      if (!valoresClaim.includes(claim.valor)) {
        navegarAcessoNegado();
      }
    }
  }

  return true;
};

export const canDeactivate: CanDeactivateFn<PacienteFormComponent> = (
  component: PacienteFormComponent
) => {
  if (component.mudancasNaoSalvas) {
    return window.confirm(
      'Tem certeza que deseja abandonar o preenchimento do formulário?'
    );
  }
  return true;
};

const navegarAcessoNegado = () => {
  inject(Router).navigate(['/acesso-negado']);
};
