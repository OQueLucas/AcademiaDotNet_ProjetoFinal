import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SintomaFormComponent } from './sintoma-form/sintoma-form.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { SintomaResolver } from './guards/Sintoma.resolver';
import { SintomaGuard } from './guards/sintoma.guard';

const routes: Routes = [
  {
    path: '',
    component: SintomasComponent,
    canActivate: [SintomaGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'novo',
    component: SintomaFormComponent,
    resolve: { sintoma: SintomaResolver },
    canActivate: [SintomaGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'editar/:id',
    component: SintomaFormComponent,
    resolve: { sintoma: SintomaResolver },
    canActivate: [SintomaGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SintomasRoutingModule {}
