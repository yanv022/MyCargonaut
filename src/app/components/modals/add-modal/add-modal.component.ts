import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { Output, EventEmitter } from '@angular/core';
import {CarsService} from "src/app/services/cars.service";
import { AuthService } from 'src/app/services/user/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import firebase from 'firebase/compat/app';
import {HelpService} from "src/app/services/help.service";


@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})


export class AddModalComponent implements OnInit {
  @Input() name: any;
  @Input() indicator: any;
  title!: string;
  where!: string;
  to!: string;
  dateAnkunft!: any;
  dateAbfahrt!: any;
  timeAnkunft!: any;
  timeAbfahrt!: any;
  description!: string;
  cars!: any[];
  selectedCar!: any;
  @Output() submit = new EventEmitter<{}>();
  price: any;



  constructor(public activeModal: NgbActiveModal, private carsService: CarsService, private authService: AuthService,
              private alertService: AlertService, private helperService: HelpService) {
  }

  async ngOnInit(): Promise<void> {

    try {
      const uid = await this.authService.userData._delegate.uid;
      if (uid === undefined) {
        this.alertService.newAlert('Bitte zuerst einloggen', 'warning');
        this.activeModal.dismiss('Nicht eingeloggt');
        return;
      }
      //Überprüfung ob das Modal für eine neue Fahrt gedacht ist oder eine Anfrage
      //(Autos) werden nur bei Fahrten gebraucht
      if(this.indicator === 'fahrt') {
        await this.carsService.getCarsOfUser(uid).forEach((cars) => {
          Promise.all(cars).then((cars) => {
            this.cars = cars;
          }).then(() => {
            if (this.cars != undefined) {
              if (this.cars.length === 0) {
                this.alertService.newAlert('Sie brauchen mindestens ein Auto', 'danger');
                this.activeModal.dismiss('Auto benötigt');
                return;
              }
            } else {
              this.alertService.newAlert('Sie brauchen mindestens ein Auto', 'danger');
              this.activeModal.dismiss('Auto benötigt');
              return;
            }
          })
        })
      }
      else if (this.indicator == 'anfrage') {

      }
    } catch (e: any) {
      this.helperService.handleNotLoggedInError(e, this.activeModal);
    }
  }


   async submitData() {
     try {
       const uid = await this.authService.userData._delegate.uid;
       if (uid === undefined) {
         this.alertService.newAlert('Bitte zuerst einloggen', 'warning');
         this.activeModal.dismiss('Nicht eingeloggt');
         return;
       }
       let timestamps = this.makeTime();
       if (isNaN(timestamps.timestampAbfahrt.nanoseconds) || isNaN(timestamps.timestampAbfahrt.seconds) ||
           isNaN(timestamps.timestampAnkunft.nanoseconds) || isNaN(timestamps.timestampAnkunft.seconds)) {
         this.alertService.newAlert('Datum und Zeit brauchen korrekte Werte', 'danger');
         return;
       }
       let dataToSubmit;
       if(this.indicator === 'fahrt') {
         if (this.title != undefined && this.where.length != undefined && this.to.length != undefined && this.description != undefined && this.selectedCar != undefined) {
           if (this.price === undefined) {
             this.price = 0;
           }
           dataToSubmit = {
             abfahrt: timestamps.timestampAbfahrt, wo: this.where, ankunft: timestamps.timestampAnkunft,
             wohin: this.to, name: this.title, creatorId: uid, autoId: this.selectedCar.autoId, price: this.price,
             accepted: false, description: this.description
           }
         } else {
           this.alertService.newAlert('Bitte zuerst alle Felder ausfüllen', 'warning');
           return;
         }
       } else if (this.indicator === 'anfrage'){
           if (this.title != undefined && this.price != undefined && this.where.length != undefined && this.to.length != undefined && this.description != undefined) {
             dataToSubmit = {
               abfahrt: timestamps.timestampAbfahrt, wo: this.where, ankunft: timestamps.timestampAnkunft,
               wohin: this.to, name: this.title, creatorId: uid, accepted: false, description: this.description,
               price: this.price
             }
           } else {
             this.alertService.newAlert('Bitte zuerst alle Felder ausfüllen', 'warning');
             return;
           }
       }
       this.submit.emit(dataToSubmit);
       this.activeModal.dismiss('submitted');

     } catch (e: any) {
       this.helperService.handleNotLoggedInError(e, this.activeModal);
     }
   }

    setCar(car: any){
      this.selectedCar = car;
    }

    makeTime(){
      const dateAnkunft = new Date(this.dateAnkunft.year, this.dateAnkunft.month, this.dateAnkunft.day, this.timeAnkunft
          .hour, this.timeAnkunft.minute);
      const timestampAnkunft = firebase.firestore.Timestamp.fromDate(dateAnkunft);
      const dateAbfahrt = new Date(this.dateAbfahrt.year, this.dateAbfahrt.month, this.dateAbfahrt.day, this.timeAbfahrt
          .hour, this.timeAbfahrt.minute);
      const timestampAbfahrt = firebase.firestore.Timestamp.fromDate(dateAbfahrt);
      return {timestampAnkunft, timestampAbfahrt};
    }





}
