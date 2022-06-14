import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private usersCollection: AngularFirestoreCollection;
  public userCars!: any[];

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');

  }

  getSpecificCarRef(userId: string, carId: string){
    return this.usersCollection.doc(userId).collection('cars').doc(carId).get();
  }

  getCarsOfUser(userId: string){
    let x = this.usersCollection.doc(userId).collection('cars')
        .valueChanges().forEach((cars)=>{
          Promise.all(cars).then((cars)=>{
            this.userCars = cars;
          })

        })



  }

}
