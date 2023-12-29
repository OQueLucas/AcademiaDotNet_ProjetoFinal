import { ResolveFn } from '@angular/router';
import { SintomaService } from '../../services/sintoma.service';
import { inject } from '@angular/core';
import { Sintoma } from '../../models/Sintoma';
import { Observable, asyncScheduler, of, scheduled } from 'rxjs';

export const SintomaResolver: ResolveFn<Observable<Sintoma>> = (
  route,
  state
) => {
  if (route.params && route.params['id']) {
    return inject(SintomaService).getById(route.params['id']);
  }
  return scheduled(of({ id: 0, nome: '' }), asyncScheduler);
};
