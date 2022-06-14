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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "src/environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { FireDatePipe } from './model/pipes/fire-date.pipe';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import {FormsModule} from "@angular/forms";
import { SingleFahrtComponent } from './components/fahrt-list/single-fahrt/single-fahrt.component';


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
    FireDatePipe,
    AddModalComponent,
    SingleFahrtComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
