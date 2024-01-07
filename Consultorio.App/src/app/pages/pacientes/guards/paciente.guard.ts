import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CanDeactivateFn } from '@angular/router';
import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

import { Injectable } from '@angular/core';
import { BaseGuard } from '../../../services/base.guard';

@Injectable()
export class PacienteGuard extends BaseGuard {
  constructor(protected override router: Router) {
    super(router);
  }

  canDeactivate: CanDeactivateFn<PacienteFormComponent> = (
    component: PacienteFormComponent
  ) => {
    if (component.mudancasNaoSalvas) {
      return window.confirm(
        'Tem certeza que deseja abandonar o preenchimento do formulário?'
      );
    }
    return true;
  };

  canActivate: CanActivateFn = (
    routeAc: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return super.validarClaims(routeAc, state);
  };
}
