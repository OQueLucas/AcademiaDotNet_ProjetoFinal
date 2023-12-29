import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TituloComponent } from './components/titulo/titulo.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    TituloComponent,
  ],
  imports: [CommonModule, AppMaterialModule],
  exports: [ErrorDialogComponent, ConfirmationDialogComponent, TituloComponent],
})
export class SharedModule {}
