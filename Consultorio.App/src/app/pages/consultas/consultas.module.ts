import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConsultaGuard } from './guards/consulta.guard';
import { ConsultaDetalhesComponent } from './consulta-detalhes/consulta-detalhes.component';
import { ListaSintomasComponent } from './lista-sintomas/lista-sintomas.component';

@NgModule({
  declarations: [ConsultasComponent, ConsultaFormComponent, ConsultaDetalhesComponent, ListaSintomasComponent],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [ConsultaGuard],
})
export class ConsultasModule {}
