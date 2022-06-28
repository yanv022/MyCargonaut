import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {CarsService} from "src/app/services/cars.service";
import {combineLatest, map, of, switchMap} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddModalComponent} from "src/app/components/modals/add-modal/add-modal.component";

@Injectable({
  providedIn: 'root'
})
export class FahrtenService {

  public fahrten: any[] = []
  private readonly fahrtenCollection: AngularFirestoreCollection;



  protected constructor(private afs: AngularFirestore, private carsService: CarsService, private modalService: NgbModal) {
    this.fahrtenCollection = this.afs.collection('fahrten');
    this.getAllRides();
  }

  getAllRides() {
      return this.afs.collection(this.fahrtenCollection.ref, (ref) =>
          ref.where('accepted', '!=', true)
      ).snapshotChanges()
          .pipe(
              map((actions: any[]) => actions.map((a) => ({...a.payload.doc.data(), ...{id: a.payload.doc.id}}))),
              switchMap((rides: any[]) => {
                  const carCols$ = rides.map((p) =>
                      this.carsService.getSpecificCarRef(p['creatorId'], p['autoId'])
                  );
                  // passing the cars down the chain
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
        modalRef.componentInstance.name = 'Neue Fahrt';
        modalRef.componentInstance.indicator = 'fahrt';
        modalRef.componentInstance.submit.subscribe((receivedData: any)=>{
            this.addRide(receivedData);
        })
    }

    public addRide(ride: any, id?: any){
      if(id == undefined) {
          id = this.afs.createId()
      }
      this.fahrtenCollection.doc(id).set(
          ride
      )
    }



}
