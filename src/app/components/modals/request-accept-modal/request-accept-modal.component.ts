import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-request-accept-modal',
  templateUrl: './request-accept-modal.component.html',
  styleUrls: ['./request-accept-modal.component.scss']
})
export class RequestAcceptModalComponent implements OnInit {
  @Input() data: any;
  @Input() cars: any;
  @Output() submit = new EventEmitter<{}>();
  selectedCar: any;

  constructor(public activeModal: NgbActiveModal, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  accept() {
    if(this.selectedCar != undefined) {
      this.submit.emit(this.selectedCar);
      this.alertService.newAlert('Sie haben die Fahrt erfolgreich angenommen', 'success');
      this.activeModal.dismiss();
      return;
    }
    this.alertService.newAlert('Bitte wählen Sie zuerst ein Auto aus', 'warning');
  }

  setCar(car: any) {
    this.selectedCar = car;
  }
}
