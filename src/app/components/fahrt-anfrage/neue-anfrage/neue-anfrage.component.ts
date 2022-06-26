import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-neue-anfrage',
  templateUrl: './neue-anfrage.component.html',
  styleUrls: ['./neue-anfrage.component.scss']
})
export class NeueAnfrageComponent implements OnInit {

  isAllert=false;

  constructor(public activeModal: NgbActiveModal) { }

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert | undefined;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;

  ngOnInit(): void {
    setTimeout(() => this.staticAlert?.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
        this.activeModal.close();
      }
    });
  }

  public buchen() {
    this.isAllert= true;
    this._success.next("Danke für ihre Buchung");
  }


}
