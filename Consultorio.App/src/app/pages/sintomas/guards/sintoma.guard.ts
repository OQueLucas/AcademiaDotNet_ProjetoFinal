import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { BaseGuard } from '../../../services/base.guard';

@Injectable()
export class SintomaGuard extends BaseGuard {
  constructor(protected override router: Router) {
    super(router);
  }

  canActivate: CanActivateFn = (
    routeAc: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return super.validarClaims(routeAc, state);
  };
}
