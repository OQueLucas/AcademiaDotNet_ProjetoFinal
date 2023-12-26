import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { HomeComponent } from './home/home.component';
import { MedicosComponent } from './medicos/medicos.component';
import { SintomaComponent } from './sintoma/sintoma.component';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'medicos', component: MedicosComponent},
  {path: 'sintomas', component: SintomaComponent},
  {path: 'consultas', component: ConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
