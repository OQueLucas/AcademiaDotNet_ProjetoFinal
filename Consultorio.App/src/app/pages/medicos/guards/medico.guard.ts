import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CanDeactivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { BaseGuard } from '../../../services/base.guard';
import { MedicoFormComponent } from '../medico-form/medico-form.component';

@Injectable()
export class MedicoGuard extends BaseGuard {
  constructor(protected override router: Router) {
    super(router);
  }

  canDeactivate: CanDeactivateFn<MedicoFormComponent> = (
    component: MedicoFormComponent
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
