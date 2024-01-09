import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { consultaResolver } from './guards/consulta.resolver';
import { ConsultaGuard } from './guards/consulta.guard';

const routes: Routes = [
  {
    path: '',
    component: ConsultasComponent,
    canActivate: [ConsultaGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'novo',
    component: ConsultaFormComponent,
    resolve: { consulta: consultaResolver },
    canDeactivate: [ConsultaGuard],
    canActivate: [ConsultaGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
  {
    path: 'editar/:id',
    component: ConsultaFormComponent,
    resolve: { consulta: consultaResolver },
    canDeactivate: [ConsultaGuard],
    canActivate: [ConsultaGuard],
    data: [{ claim: { nome: 'role', valor: 'Medico' } }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultasRoutingModule {}
