import { Component, Input, OnInit } from '@angular/core';
import { HelpService } from 'src/app/services/help.service';
import { AnfragenService } from 'src/app/services/anfragen.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-single-anfrage',
  templateUrl: './single-anfrage.component.html',
  styleUrls: ['./single-anfrage.component.scss']
})
export class SingleAnfrageComponent implements OnInit {
  @Input() request!: any;

  constructor(
    public helperService: HelpService,
    private anfragenService: AnfragenService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  async acceptRequest() {
    try {
      const uid = await this.authService.userData._delegate.uid;
      if (uid === undefined) {
        this.alertService.newAlert('Bitte zuerst einloggen', 'warning');
        return;
      }
      this.anfragenService.acceptRequest(this.request);
    } catch (e) {
      this.helperService.handleNotLoggedInError(e);
    }
  }
}
