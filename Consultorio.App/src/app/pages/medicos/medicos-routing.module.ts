import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';
import { medicoResolver } from './guards/medico.resolver';
import { MedicoDetalhesComponent } from './medico-detalhes/medico-detalhes.component';
import { MedicoGuard } from './guards/medico.guard';

const routes: Routes = [
  {
    path: '',
    component: MedicosComponent,
    canActivate: [MedicoGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'novo',
    component: MedicoFormComponent,
    resolve: { medico: medicoResolver },
    canDeactivate: [MedicoGuard],
    canActivate: [MedicoGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'detalhes/:id',
    component: MedicoDetalhesComponent,
    resolve: { medico: medicoResolver },
    canActivate: [MedicoGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'editar/:id',
    component: MedicoFormComponent,
    resolve: { medico: medicoResolver },
    canActivate: [MedicoGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}
