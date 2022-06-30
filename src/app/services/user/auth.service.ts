import { Injectable, NgZone } from '@angular/core';

import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MyUser } from '../../model/interfaces/myUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  localusername: string = '';
  localgbdatum: Date = new Date('');
  localGeld: number = 500;
  localdisname: string = '';
  localphotoURL: string = '';

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  setauth(disname: string, username: string, gbDatum: Date) {
    this.localusername = username;
    this.localgbdatum = gbDatum;
    this.localdisname = disname;
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
        console.log('test');
        console.log('user', result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  /* die daten mussen voher in der registrierung componente gesetz werden*/
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        //this.SendVerificationMail();
        //this.SetUserData(result.user);
        this.SetUserDataRegistrierung(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: MyUser = {
      uid: user.uid,
      username: 'leer',
      email: user.email,
      displayName: 'leer',
      photoURL: 'leer',
      dayOfBirth: new Date(''),
      emailVerified: user.emailVerified,
      geld: this.localGeld
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  SetUserDataRegistrierung(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: MyUser = {
      uid: user.uid,
      username: this.localusername,
      email: user.email,
      displayName: this.localdisname,
      photoURL: this.localphotoURL,
      dayOfBirth: this.localgbdatum,
      emailVerified: user.emailVerified,
      geld: this.localGeld
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
  /*async getAllUser(): Promise<User[]> {
    return this.userData.get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const user = doc.data();
        user.dId = doc.id;
        return user;
      })
    );
  }*/
  /** FOR APP MODULE INIT
   *  - dient dazu um den Authentifizierungsservice beim erstmaligen laden der Seite direkt zu initialisieren.
   * */
  initalizeService() {
    console.log('Authentification Serivce successfully initialized');
  }
}
