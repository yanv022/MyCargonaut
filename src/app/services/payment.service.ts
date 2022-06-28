import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {ref, runTransaction} from "@angular/fire/database";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    userCollection: AngularFirestoreCollection;

    constructor(private afs: AngularFirestore) {
        this.userCollection = this.afs.collection('users');
    }
    pay(){}
    /*
      async pay(driverId: any, passengerId: any, amount: any){
        const driverRef = this.afs.doc(driverId);
          await firebase.firestore().runTransaction(transaction => {
              return transaction.get(firebase.firestore().collection('users').doc(driverId)).then(eventDoc => {
                  // @ts-ignore
                  const newAmount = eventDoc.data().tokens + 15;
                  return transaction
                      .update(firebase.firestore().collection('eventList').doc(eventId), {revenue: newRevenue});
              });
          })
    }

     */
}
