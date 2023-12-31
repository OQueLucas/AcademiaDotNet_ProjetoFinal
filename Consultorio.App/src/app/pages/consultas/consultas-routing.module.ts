import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { consultaResolver } from './guards/consulta.resolver';

const routes: Routes = [
  { path: '', component: ConsultasComponent },
  {
    path: 'novo',
    component: ConsultaFormComponent,
    resolve: { consulta: consultaResolver },
  },
  {
    path: 'editar/:id',
    component: ConsultaFormComponent,
    resolve: { consulta: consultaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultasRoutingModule {}
