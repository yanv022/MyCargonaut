import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users');
  }

  getUserDataById_Observable(userId: string): Observable<any>{
    return this.userCollection.doc(userId).valueChanges();
  }
}
