import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {CarsService} from "src/app/services/cars.service";
import {combineLatest, map, of, switchMap} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddModalComponent} from "src/app/components/add-modal/add-modal.component";

@Injectable({
  providedIn: 'root'
})
export class FahrtenService {

  public fahrten: any[] = []
  public fahrtenLoaded: boolean;
  private readonly fahrtenCollection: AngularFirestoreCollection;



  constructor(private afs: AngularFirestore, private carsService: CarsService, private modalService: NgbModal) {
    this.fahrtenLoaded = false;
    this.fahrtenCollection = this.afs.collection('fahrten');
    this.getAllRides();
  }

  getAllRides() {
      return this.fahrtenCollection
          .snapshotChanges()
          .pipe(
              map((actions: any[]) => actions.map((a) => ({...a.payload.doc.data(), ...{id: a.payload.doc.id}}))),
              switchMap((rides: any[]) => {
                  const carCols$ = rides.map((p) =>
                      this.carsService.getSpecificCarRef(p['creatorId'], p['autoId'])
                  );

                  // passing the products value down the chain
                  return combineLatest([of(rides), combineLatest(carCols$.length ? carCols$ : [of([])])]);
              }),
              map(([rides, carCols]) =>
                  rides.map(async (r, idx) => {
                      // @ts-ignore
                      r.car = await carCols[idx].data();
                      return r
                  })
              )
          );
  }

    openAddModal() {
        const modalRef = this.modalService.open(AddModalComponent);
        modalRef.componentInstance.submit.subscribe((receivedData: any)=>{
            this.addRide(receivedData);
        })
    }

    addRide(ride: any){
      let id = this.afs.createId()
      this.fahrtenCollection.doc(id).set(
          ride
      )
    }

}
