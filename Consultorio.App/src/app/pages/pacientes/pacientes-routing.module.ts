import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { pacienteResolver } from './guards/paciente.resolver';
import { canActivate, canDeactivate } from './guards/paciente.guard';

const routes: Routes = [
  {
    path: '',
    component: PacientesComponent,
    canActivate: [canActivate],
    data: [{ claim: { nome: 'Paciente', valor: 'Listar' } }],
  },
  {
    path: 'novo',
    component: PacienteFormComponent,
    resolve: { paciente: pacienteResolver },
    canDeactivate: [canDeactivate],
    canActivate: [canActivate],
    data: [{ claim: { nome: 'Paciente', valor: 'Adicionar' } }],
  },
  {
    path: 'editar/:id',
    component: PacienteFormComponent,
    resolve: { paciente: pacienteResolver },
    canActivate: [canActivate],
    data: [{ claim: { nome: 'Paciente', valor: 'Editar' } }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}
