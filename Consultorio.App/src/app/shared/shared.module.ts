import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { AlertComponent } from './components/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    TituloComponent,
    AlertComponent,
  ],
  imports: [CommonModule, AppMaterialModule, NgbModule],
  exports: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    TituloComponent,
    AlertComponent,
    NgxSpinnerModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
  ],
})
export class SharedModule {}
