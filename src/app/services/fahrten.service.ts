import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import fahrten from "src/app/model/interfaces/fahrten";
import {CarsService} from "src/app/services/cars.service";
import {combineLatest, map, Observable, of, switchMap} from "rxjs";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class FahrtenService {

  public fahrten: any[] = []
  private readonly fahrtenCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private carsService: CarsService) {
    this.fahrtenCollection = this.afs.collection('fahrten');
    this.getAllRides();
  }

  async getAllRides() {
      await this.fahrtenCollection.valueChanges().pipe(map(
      (fahrten: any[]) => fahrten.map(fahrt =>{
          fahrt.abfahrt = fahrt.abfahrt ? fahrt.abfahrt.toDate() : 'Kein Datum angegeben';
          fahrt.ankunft = fahrt.ankunft ? fahrt.ankunft.toDate() : 'Kein Datum angegeben';
          return ({...fahrt})
          })
      )).forEach((fahrtenDocs) => {
          this.fahrten = fahrtenDocs;
          for(let fahrt of fahrtenDocs){
              this.afs.collection('users').doc(fahrt['creatorId']).collection('cars').doc(fahrt['autoId'])
                  .ref.onSnapshot((carSnapshot) =>{
                      if(carSnapshot.exists) {
                          fahrt["car"] = carSnapshot.data();
                          if(!this.fahrten.includes(fahrt)){
                              this.fahrten.push(fahrt);
                          }
                      }
              })

          }
      })
  }


}
