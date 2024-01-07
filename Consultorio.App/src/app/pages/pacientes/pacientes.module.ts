import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PacienteDetalhesComponent } from './paciente-detalhes/paciente-detalhes.component';
import { ListaConsultasComponent } from './lista-consultas/lista-consultas.component';
import { PacienteGuard } from './guards/paciente.guard';

@NgModule({
  declarations: [
    PacientesComponent,
    PacienteFormComponent,
    PacienteDetalhesComponent,
    ListaConsultasComponent,
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [PacienteGuard],
})
export class PacientesModule {}
