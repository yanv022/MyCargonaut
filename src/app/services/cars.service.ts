import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { AddModalComponent } from 'src/app/components/modals/add-modal/add-modal.component';
import { AddVehicleComponent } from 'src/app/components/modals/add-vehicle/add-vehicle.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/user/auth.service';
import Car from 'src/app/model/interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private usersCollection: AngularFirestoreCollection;
  public userCars!: any[];
  private tempCar: any;

  constructor(
    private afs: AngularFirestore,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.usersCollection = this.afs.collection('users');
  }

  getSpecificCarRef(userId: string, carId: string) {
    return this.usersCollection.doc(userId).collection('cars').doc(carId).get();
  }

  getCarsOfUser(userId: string) {
    return this.usersCollection
      .doc(userId)
      .collection('cars')
      .valueChanges({ idField: 'autoId' });
  }

  async addCarModal() {
    try {
      let car: Car = {
        color: '',
        model: '',
        seats: 0,
        storageInKg: 0,
        type: '',
        brand: ''
      };
      if (this.tempCar != undefined) {
        car = this.tempCar;
      }
      let userId = await this.authService.userData.uid;
      if (!userId) {
        setTimeout(async () => {
          userId = await this.authService.userData.uid;
        }, 100);
      }
      console.log(userId);
      let modalRef = this.modalService.open(AddVehicleComponent);
      modalRef.componentInstance.car = car;
      modalRef.componentInstance.submit.subscribe((receivedData: any) => {
        console.log(receivedData, userId);
        this.addCar(userId, receivedData);
      });
      modalRef.dismissed.subscribe((data) => {
        this.tempCar = data;
      });
    } catch {
      console.log('wait 1 Second');
    }
  }

  addCar(userId: string, car: {}) {
    this.usersCollection.doc(userId).collection('cars').add(car);
  }
}
