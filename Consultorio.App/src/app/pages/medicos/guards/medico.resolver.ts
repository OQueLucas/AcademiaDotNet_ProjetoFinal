import { ResolveFn } from '@angular/router';
import { MedicoService } from '../../../services/medico.service';
import { inject } from '@angular/core';
import { Observable, asyncScheduler, of, scheduled } from 'rxjs';
import { Medico } from '../model/medico';

export const medicoResolver: ResolveFn<Observable<Medico>> = (route, state) => {
  if (route.params && route.params['id']) {
    return inject(MedicoService).getById(route.params['id']);
  }
  return scheduled(
    of({
      id: 0,
      nome: '',
      pessoaId: 0,
      nomeSocial: '',
      crm: '',
      especializacao: '',
      cpf: '',
      dataNascimento: null,
      email: '',
      tipoSanguineo: null,
      genero: null,
      cep: '',
      bairro: '',
      endereco: '',
      telefone: '',
    }),
    asyncScheduler
  );
};
