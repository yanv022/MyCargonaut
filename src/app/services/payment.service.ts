import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users');
  }
  async pay(receiverId: any, payerId: any, amount: any) {
    const receiverRef = this.userCollection.doc(receiverId).ref;
    const payerRef = this.userCollection.doc(payerId).ref;
    try {
      await this.afs.firestore
        .runTransaction(async (transaction) => {
          const payDoc = await transaction.get(payerRef);
          if (!payDoc.exists) {
            throw 'User does not exist!';
          }
          let tokens = payDoc.data()?.['tokens'];
          const newAmount = tokens - amount;
          if (!tokens || newAmount < 0) {
            throw 'Kein Geld in der Tasche';
          }
          transaction.update(payerRef, { tokens: newAmount });
        })
        .then(async () => {
          await this.afs.firestore.runTransaction(async (transaction) => {
            const recDoc = await transaction.get(receiverRef);
            if (!recDoc.exists) {
              throw 'User does not exist!';
            }
            let newAmount;
            let tokens = recDoc.data()?.['tokens'];
            if (!tokens) {
              newAmount = amount;
            } else {
              newAmount = tokens + amount;
            }
            transaction.update(receiverRef, { tokens: newAmount });
          });
        })
        .then(() => {
          console.log('All Transaction Successful');
          return true;
        });
    } catch (e) {
      return e;
    }
  }
}
