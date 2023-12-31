import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { SintomaFormComponent } from './sintoma-form/sintoma-form.component';
import { SintomasRoutingModule } from './sintomas-routing.module';
import { SintomasComponent } from './sintomas/sintomas.component';

@NgModule({
  declarations: [SintomasComponent, SintomaFormComponent],
  imports: [
    CommonModule,
    SintomasRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SintomasModule {}
