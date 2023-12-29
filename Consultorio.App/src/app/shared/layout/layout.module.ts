import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';

import { TituloComponent } from '../../titulo/titulo.component';

@NgModule({
  declarations: [TituloComponent],
  imports: [CommonModule, AlertModule.forRoot()],
  exports: [TituloComponent],
})
export class LayoutModule {}
