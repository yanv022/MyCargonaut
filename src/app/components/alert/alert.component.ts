import {Component, ViewChild} from '@angular/core';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime} from "rxjs";
import { AlertService} from "src/app/services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  _messages!: any;
  type: string;
  alertMessage = '';

  @ViewChild('alert', {static: false}) alert!: NgbAlert;




  constructor(public alertService: AlertService) {
    this._messages = this.alertService._messages;
    this.type = this.alertService.type;

    this._messages.subscribe((message: string) => this.alertMessage = message);
    this._messages.pipe(debounceTime(5000)).subscribe(() => {
      if (this.alert) {
        this.alert.close();
      }
    });
  }
}
