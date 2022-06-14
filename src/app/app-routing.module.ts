import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BewertungComponent } from './components/bewertung/bewertung.component';
import { FahrtListComponent } from './components/fahrt-list/fahrt-list.component';
import { FahrtSuchenComponent } from './components/fahrt-suchen/fahrt-suchen.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegistrierenComponent } from './components/registrieren/registrieren.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';

const routes: Routes = [
  {path: 'profil',component: ProfilComponent},
  {path: 'bewertung',component: BewertungComponent},
  {path: 'fahrtErstellen',component: AddModalComponent},
  {path: 'fahrtList',component: FahrtListComponent},
  {path: 'fahrtSuche',component: FahrtSuchenComponent},
  {path: 'login',component: LoginComponent},
  {path: 'registrieren',component: RegistrierenComponent},
  {path: 'Navigation',component: NavigationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }