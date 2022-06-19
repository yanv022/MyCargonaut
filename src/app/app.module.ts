import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrierenComponent } from './components/registrieren/registrieren.component';
import { ProfilComponent } from './components/profil/profil.component';
import { BewertungComponent } from './components/bewertung/bewertung.component';
import { FahrtListComponent } from './components/fahrt-list/fahrt-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "src/environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import {FormsModule} from "@angular/forms";
import { SingleFahrtComponent } from './components/fahrt-list/single-fahrt/single-fahrt.component';
import {AuthService} from "./services/user/auth.service";
import { AlertComponent } from './components/alert/alert.component';
import { FahrtSucheComponent } from './components/fahrt-list/fahrt-suche/fahrt-suche.component';
import { BuchenComponent } from './components/fahrt-list/buchen/buchen.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { FahrtAnfrageComponent } from './components/fahrt-anfrage/fahrt-anfrage.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegistrierenComponent,
    ProfilComponent,
    BewertungComponent,
    FahrtListComponent,
    SignUpComponent,
    DashboardComponent,
    VerifyEmailComponent,
    AddModalComponent,
    SingleFahrtComponent,
    AlertComponent
    FahrtSucheComponent,
    BuchenComponent,
    HomepageComponent,
    FooterComponent,
    FahrtAnfrageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ds: AuthService) => () => ds.initalizeService(),
      deps: [AuthService],
      multi: true
    }
      ],
  bootstrap: [AppComponent]
})
export class AppModule{}
