import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SintomaFormComponent } from './sintoma-form/sintoma-form.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { SintomaResolver } from './guards/Sintoma.resolver';

const routes: Routes = [
  { path: '', component: SintomasComponent },
  {
    path: 'novo',
    component: SintomaFormComponent,
    resolve: { sintoma: SintomaResolver },
  },
  {
    path: 'editar/:id',
    component: SintomaFormComponent,
    resolve: { sintoma: SintomaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SintomasRoutingModule {}
