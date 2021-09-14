import { JwtInterceptorService } from './_helpers/jwt-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DetailsUserComponent } from './user/details-user/details-user.component';

import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgBrazil } from 'ng-brazil';
import { ValidatorsModule } from 'ngx-validators';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorInterceptorService } from './_helpers/error-interceptor.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DetailsUserComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent, 
  ],
  imports: [
    //angular
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,

    TextMaskModule,
    NgBrazil,

    ValidatorsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
