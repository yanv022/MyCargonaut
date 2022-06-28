import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {arrayUnion} from "@angular/fire/firestore";

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

  addDriverOfRide(userId: any, rideId: any){
    this.userCollection.ref.doc(userId).update({
      fahrtenAlsFahrer: arrayUnion(rideId)
    })
  }

  addPassengerOfRide(userId: any, rideId: any){
    this.userCollection.ref.doc(userId).update({
      fahrtenAlsMitfahrer: arrayUnion(rideId)
    })
  }


}
