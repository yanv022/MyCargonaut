import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  _messages = new Subject<string>();
  type: string;

  constructor() {
    this.type = 'success';
  }

  public newAlert(alertMsg: string, type: string) {
    this.type = type;
    this._messages.next(alertMsg);
  }
}
