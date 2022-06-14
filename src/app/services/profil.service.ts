import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private usersCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
  }




}
