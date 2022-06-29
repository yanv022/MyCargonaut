import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {CarsService} from "src/app/services/cars.service";
import {combineLatest, map, of, switchMap} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddModalComponent} from "src/app/components/modals/add-modal/add-modal.component";
import {BuchenComponent} from "src/app/components/fahrt-list/buchen/buchen.component";
import {AuthService} from "src/app/services/user/auth.service";
import {HelpService} from "src/app/services/help.service";

@Injectable({
  providedIn: 'root'
})
export class FahrtenService {

  public fahrten: any[] = []
  private readonly fahrtenCollection: AngularFirestoreCollection;



  protected constructor(private afs: AngularFirestore, private carsService: CarsService, private modalService: NgbModal,
                        private authService: AuthService, private helperService: HelpService) {
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

    public async addRide(ride: any, id?: any){
      console.log(ride, id);
      if(id == undefined) {
          id = this.afs.createId()
      }
      await this.fahrtenCollection.doc(id).set(
          ride
      )
    }


    acceptRide(fahrt: any) {
        const modalRef = this.modalService.open(BuchenComponent);
        modalRef.componentInstance.data = fahrt;
        modalRef.result.then(async() => {
            const uid = await this.authService.userData._delegate.uid;
            //TODO: WARUM IST SCHON EINE PASSENGER ID IN DATABASE? LOGIK ÜBERDENKEN
            //await this.helperService.addRideForPassengerAndDriver(fahrt.creatorId, uid, )
        }).catch((error) => {
            console.log(error);
        });
    }
}
