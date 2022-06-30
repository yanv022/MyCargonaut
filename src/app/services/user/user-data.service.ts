import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import FieldValue = firebase.firestore.FieldValue;
import { arrayUnion } from '@angular/fire/firestore';
import { MyUser } from 'src/app/model/interfaces/myUser';
import { AuthService } from 'src/app/services/user/auth.service';
import { snapshotChanges } from '@angular/fire/compat/database';
import { onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements OnInit {
  private userCollection: AngularFirestoreCollection<MyUser>;
  userdaten: any;

  constructor(private afs: AngularFirestore, public authService: AuthService) {
    this.userCollection = this.afs.collection('users');
  }
  ngOnInit(): void {}
  getUserDataById_Observable(userId: string): Observable<MyUser | undefined> {
    return this.userCollection.doc(userId).valueChanges({ idField: 'uid' });
  }

  async addDriverOfRide(userId: any, rideId: any) {
    await this.afs
      .collection('users')
      .doc(userId)
      .update({
        fahrtenAlsFahrer: arrayUnion(rideId)
      });
  }

  async addPassengerOfRide(userId: any, rideId: any) {
    await this.afs
      .collection('users')
      .doc(userId)
      .update({
        fahrtenAlsMitfahrer: arrayUnion(rideId)
      });
  }

  getUserData() {
    this.getUserDataById_Observable(this.authService.userData.userId).subscribe(
      (data) => {
        this.userdaten = data;
      }
    );
  }
  async uptate(attribute: string, value: string) {
    attribute = attribute.toUpperCase();
    switch (attribute) {
      case 'NAME':
        this.userCollection
          .doc(this.authService.userData.uid)
          .update({ displayName: value });
        break;
      case 'DISPLAYNAME':
        this.userCollection
          .doc(this.authService.userData.uid)
          .update({ displayName: value });
        break;
      case 'EMAIL':
        this.userCollection
          .doc(this.authService.userData.email)
          .update({ displayName: value });
        break;
      case 'PHOTOURL':
        this.userCollection
          .doc(this.authService.userData.photoURL)
          .update({ displayName: value });
        break;
      case 'EMAILVERIFIED':
        this.userCollection
          .doc(this.authService.userData.emailVerified)
          .update({ displayName: value });
        break;
      default:
        console.log('erreur atribute bei uptate');
        break;
    }
  }
  async uptatename(name: string, user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.update({ displayName: name });
  }
  async deleteUser() {
    this.userCollection.doc(this.authService.userData.uid).delete();
  }
  async setData(
    userId: string,
    email: string,
    displazname: string,
    photoURL: string,
    dayOfBirth: Date,
    username: string
  ) {
    const userData: MyUser = {
      uid: userId,
      username: username,
      email: email,
      displayName: displazname,
      photoURL: photoURL,
      dayOfBirth: dayOfBirth,
      emailVerified: true,
      geld: 500
    };
    this.SetUserData(userData);
  }
  async SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: MyUser = {
      uid: user.uid,
      username: 'hard yanv02',
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      dayOfBirth: user.dayOfBirth,
      emailVerified: user.emailVerified,
      geld: 500
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  async getallchange() {
    this.userCollection.snapshotChanges();
  }

  getname(user: any) {
    this.getUserDataById_Observable(user.uid).subscribe((data) => {
      return data?.displayName;
    });
  }
  /*
  async getAllUser(): Promise<MyUser[]> {
    return this.userCollection.get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const user = doc.data();
        user.uid = doc.id;
        return user;
      })
    );
  }
  async getUser(uid: string): Promise<MyUser | undefined> {
    return this.getAllUser().then(users => users.find(user => user.uid === uid))
  }
  */
}
