import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { SharedModule } from './shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserAnimationsModule,
  ],
  providers: [HttpClientModule, FormsModule, provideNgxMask()],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
