import { Injectable, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { AddModalComponent } from 'src/app/components/modals/add-modal/add-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcceptModalComponent } from 'src/app/components/modals/accept-modal/accept-modal.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { HelpService } from 'src/app/services/help.service';
import { RequestAcceptModalComponent } from 'src/app/components/modals/request-accept-modal/request-accept-modal.component';
import { CarsService } from 'src/app/services/cars.service';
import { AlertService } from 'src/app/services/alert.service';
import { FahrtenService } from 'src/app/services/fahrten.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AnfragenService {
  protected requestCollection: AngularFirestoreCollection;
  protected requestCache: any;

  protected constructor(
    private afs: AngularFirestore,
    private modalService: NgbModal,
    private authService: AuthService,
    private helperService: HelpService,
    private carsService: CarsService,
    private alertService: AlertService,
    private fahrtenService: FahrtenService,
    private paymentService: PaymentService,
    private userDataService: UserDataService
  ) {
    this.requestCollection = this.afs.collection('anfragen');
    this.getAllRequests();
  }

  public getAllRequests() {
    return this.afs
      .collection(this.requestCollection.ref, (ref) =>
        ref.where('accepted', '==', false)
      )
      .valueChanges({ idField: 'reqId' });
  }

  public newRequestModal() {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.name = 'Neue Anfrage';
    modalRef.componentInstance.indicator = 'anfrage';
    modalRef.componentInstance.submit.subscribe((receivedData: any) => {
      this.processNewRequest(receivedData);
    });
  }

  protected processNewRequest(data: any) {
    let id = this.afs.createId();
    this.requestCollection.doc(id).set(data);
  }

  public acceptRequest(request: any) {
    this.requestCache = request;
    if (request.price == undefined) {
      request.price = 0;
    }
    const data = {
      wohin: request.wohin,
      wo: request.wo,
      description: request.description,
      price: request.price
    };
    const modalRef = this.modalService.open(AcceptModalComponent);
    modalRef.componentInstance.name = 'Anfrage';
    modalRef.componentInstance.indicator = 'anfrage';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.submit.subscribe((data: any) => {
      this.requestAccepted(data);
    });
    modalRef.dismissed.subscribe(() => {
      this.requestCache = undefined;
    });
  }

  protected async requestAccepted(data: any) {
    try {
      const uid = await this.authService.userData._delegate.uid;
      let userCars: any[];
      userCars = await new Promise((resolve) => {
        this.carsService.getCarsOfUser(uid).subscribe((cars) => {
          resolve(cars);
        });
      });
      if (userCars == undefined || userCars.length == 0) {
        this.alertService.newAlert(
          'Bitte fügen Sie zuerst ein Auto hinzu',
          'danger'
        );
        return;
      }
      const modalRef = this.modalService.open(RequestAcceptModalComponent);
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.cars = userCars;
      modalRef.componentInstance.submit.subscribe(async (car: any) => {
        try {
          let request = this.requestCache;
          this.requestCache = undefined;
          if (request.price > 0) {
            let paymentResult = await this.paymentService.pay(
              uid,
              request.creatorId,
              request.price
            );
            if (typeof paymentResult == 'string') {
              await Promise.reject(paymentResult);
            }
          }
          let id = this.afs.createId();
          const data = {
            abfahrt: request.abfahrt,
            wo: request.wo,
            ankunft: request.ankunft,
            wohin: request.wohin,
            name: request.name,
            creatorId: uid,
            autoId: car,
            price: request.price,
            accepted: true,
            description: request.description,
            passengerId: request.creatorId
          };
          this.fahrtenService
            .addRide(data, id)
            .then(() => {
              this.helperService.addRideForPassengerAndDriver(
                uid,
                request.creatorId,
                uid
              );
            })
            .then(() => {
              this.requestCollection.doc(request.reqId).update({
                accepted: true
              });
            });
        } catch (e) {
          this.alertService.newAlert(
            'Ersteller der Anfrage hat leider ' + e,
            'danger'
          );
        }
      });
    } catch (e) {
      this.helperService.handleNotLoggedInError(e);
    }
  }
}
