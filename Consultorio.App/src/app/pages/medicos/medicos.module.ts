import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos/medicos.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MedicoFormComponent } from './medico-form/medico-form.component';

@NgModule({
  declarations: [MedicosComponent, MedicoFormComponent],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class MedicosModule {}
