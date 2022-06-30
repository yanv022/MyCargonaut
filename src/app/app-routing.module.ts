import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BewertungComponent } from './components/bewertung/bewertung.component';
import { FahrtListComponent } from './components/fahrt-list/fahrt-list.component';
import { FahrtAnfrageComponent } from './components/fahrt-anfrage/fahrt-anfrage.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegistrierenComponent } from './components/registrieren/registrieren.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddModalComponent } from './components/modals/add-modal/add-modal.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoggedInGuard } from 'src/app/guards/logged-in.guard';

const routes: Routes = [
  { path: 'profil', component: ProfilComponent, canActivate: [LoggedInGuard] },
  { path: 'bewertung', component: BewertungComponent },
  { path: 'fahrtErstellen', component: AddModalComponent },
  { path: '', component: HomepageComponent },
  { path: 'fahrtList', component: FahrtListComponent },
  { path: 'fahrtAnfrage', component: FahrtAnfrageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrieren', component: RegistrierenComponent },
  { path: 'Navigation', component: NavigationComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
