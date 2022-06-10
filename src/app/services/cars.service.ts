import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private usersCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');

  }

  getSpecificCar(userId: string, carId: string){
    return this.usersCollection.doc(userId).collection('cars').doc(carId).valueChanges();
  }

}
