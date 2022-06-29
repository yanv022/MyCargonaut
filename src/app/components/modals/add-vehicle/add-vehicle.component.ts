import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from 'src/app/services/alert.service';
import Car from "src/app/model/interfaces/car";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  @Input() car?: Car;
  @Output() submit = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  submitData() {
    if(this.checkIfAllFieldsAreValid()) {
      this.submit.emit(this.car);
      this.activeModal.dismiss(undefined);
    } else {
      this.alertService.newAlert('Bitte alle Felder ausfüllen', 'warning')
    }
  }

  checkIfAllFieldsAreValid() {
    // @ts-ignore
    return this.car?.brand.trim().length > 0 && this.car.model.trim().length > 0 && this.car.color.trim().length > 0 && this.car.seats > 0 && this.car.storageInKg > 0 && this.car.type.trim().length > 0;
  }
}
