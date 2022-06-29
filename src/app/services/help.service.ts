import {Injectable} from '@angular/core';
import {AlertService} from "src/app/services/alert.service";
import {CarsService} from "src/app/services/cars.service";
import {NotFoundError} from "rxjs";
import firebase from 'firebase/compat';
import { UserDataService } from 'src/app/services/user/user-data.service';
import {FahrtenService} from "src/app/services/fahrten.service";

@Injectable({
  providedIn: 'root'
})

/**
 * SERVICE FOR SHARED METHODS
 */
export class HelpService {

  constructor(private alertService: AlertService, private carsService: CarsService,
              private userDataService: UserDataService) {
  }

  isDate(potentialDate: any) {
    return potentialDate instanceof Date;
  }

  /**
   * pass any array received from firestore and an array of attributes where firestore timestamps can be found.
   * the function will return an array with Date Objects instead of firestore timestamps
   * @param arr
   * @param attributes
   */
  firebaseDateToNormalDate(arr: any[], attributes: string[]) {
    return arr.map((el: any) => {
      for (let att of attributes) {
        if (el[att]) {
          el[att] = el[att].toDate();
        }
      }
      return el;
    })
  }

  handleNotLoggedInError(e: any, activeModal?: any) {
    if ('message' in e) {
      if (e.message.includes('_delegate') || e.message.includes('_this.authService.userData')) {
        this.alertService.newAlert('Bitte vorher einloggen', 'danger');
        activeModal?.dismiss(e);
        return;
      }
      this.alertService.newAlert(e.message, 'danger');
      activeModal?.dismiss(e);
      return;
    } else {
      this.alertService.newAlert('Etwas ist schief gelaufen, bitte erneut versuchen', 'danger');
      activeModal?.dismiss(e);
    }
  }

  async x(uid: string, activeModal: any) {
    let userCars: any[];
    await this.carsService.getCarsOfUser(uid).forEach((cars) => {
      Promise.all(cars).then((cars) => {
        userCars = cars;
      })
    userCars = this.checkCars(userCars, activeModal);
    return userCars;
    })
  }

  checkCars(cars: any, activeModal: any) {
    if (cars != undefined) {
      if (cars.length === 0) {
        this.alertService.newAlert('Sie brauchen mindestens ein Auto', 'danger');
        activeModal.dismiss('Auto benötigt');
        return undefined;
      }
      return cars;
    } else {
      this.alertService.newAlert('Sie brauchen mindestens ein Auto', 'danger');
      activeModal.dismiss('Auto benötigt');
      return undefined;
    }
  }

  addRideForPassengerAndDriver(driverId: any, passengerId: any, rideId: any){
    this.userDataService.addDriverOfRide(driverId, rideId);
    this.userDataService.addPassengerOfRide(passengerId, rideId)
  }

}
