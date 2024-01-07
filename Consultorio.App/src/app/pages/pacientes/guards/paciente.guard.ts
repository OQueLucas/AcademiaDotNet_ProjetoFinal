import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageUtils } from '../../../utils/localstorage';

export const canActivate: CanActivateFn = (
  routeAc: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localStorageUtils = new LocalStorageUtils();
  if (!localStorageUtils.obterTokenUsuario()) {
    inject(Router).navigate(['/conta/login']);
  }
  return true;
};
