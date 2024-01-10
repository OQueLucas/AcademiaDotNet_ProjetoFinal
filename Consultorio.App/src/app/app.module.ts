import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MenuComponent } from './nav/menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuLoginComponent } from './nav/menu-login/menu-login.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './services/error.handler.service';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    NotFoundComponent,
    MenuLoginComponent,
    AcessoNegadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
    }),
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    HttpClientModule,
    FormsModule,
    provideNgxMask(),
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
