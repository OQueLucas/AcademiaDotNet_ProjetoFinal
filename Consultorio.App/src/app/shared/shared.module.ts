import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    TituloComponent,
    AlertComponent,
  ],
  imports: [CommonModule, AppMaterialModule, AlertModule],
  exports: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    TituloComponent,
    AlertComponent,
  ],
})
export class SharedModule {}
