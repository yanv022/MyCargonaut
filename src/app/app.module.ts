import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrierenComponent } from './components/registrieren/registrieren.component';
import { ProfilComponent } from './components/profil/profil.component';
import { BewertungComponent } from './components/bewertung/bewertung.component';
import { FahrtListComponent } from './components/fahrt-list/fahrt-list.component';
import { FahrtSuchenComponent } from './components/fahrt-suchen/fahrt-suchen.component';
import { FahrtErstellenComponent } from './components/fahrt-erstellen/fahrt-erstellen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "src/environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/user/auth.service";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {VerifyEmailComponent} from "./components/login/verify-email.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegistrierenComponent,
    ProfilComponent,
    BewertungComponent,
    FahrtListComponent,
    FahrtSuchenComponent,
    FahrtErstellenComponent,
    SignUpComponent,
    VerifyEmailComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
