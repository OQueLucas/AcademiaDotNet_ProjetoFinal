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

@NgModule({
  declarations: [PacientesComponent, PacienteFormComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class PacientesModule {}
