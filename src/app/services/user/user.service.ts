import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public email!: string;
  public password!: string;
  public uID!: string | undefined;
  public user!: any;
  public curUser!: any


  constructor(public AFauth: AngularFireAuth, public router: Router) {
    AFauth.authState.subscribe(user => {
      this.curUser = user;
    })

  }

  //TODO glaube "checkLogin" geht besser wenn man sicher Observebales noch Mal anschaut
  checkLogin() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uID = user.uid;
        this.user = user; //könnte man allgemein benutzen, für E-Mail Adresse etc
        console.log(user.uid);
        this.router.navigate(['/home']);
      } else {
        this.uID = undefined;
        this.user = undefined;
        console.log(this.uID + "No");
      }
    });
  }


  login() {
    console.log(this.email)
    console.log(this.password)
    if (this.email != undefined && this.password != undefined &&
      this.email.trim().length > 0 && this.email.includes('@') && this.password.trim().length > 0) {
      this.AFauth.signInWithEmailAndPassword(this.email, this.password).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      });
      this.checkLogin();
    } else {
      alert('Login failed');
    }
  }

  loginGoogle() {
    this.AFauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(r => {
      console.log("successfully logged in" + r)

    }).catch(e => {
      console.log(e);

    });
    this.checkLogin();

  }

  logout() {
    this.AFauth.signOut().then(r => console.log(r));
    this.checkLogin();

  }

  newUser() {
    console.log(this.email)
    console.log(this.password)
    if (this.email.trim().length > 0 && this.email.includes('@') && this.password.trim().length > 0) {
      this.AFauth.createUserWithEmailAndPassword(this.email, this.password).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      });
      this.checkLogin();
    }
  }


}
