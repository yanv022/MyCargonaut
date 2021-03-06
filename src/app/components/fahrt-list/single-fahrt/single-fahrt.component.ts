import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user/user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuchenComponent } from '../buchen/buchen.component';
import { HelpService } from 'src/app/services/help.service';
import { FahrtenService } from 'src/app/services/fahrten.service';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-single-fahrt',
  templateUrl: './single-fahrt.component.html',
  styleUrls: ['./single-fahrt.component.scss']
})
export class SingleFahrtComponent implements OnInit {
  @Input() fahrt: any;
  public user!: any;
  public loaded: boolean;

  constructor(
    private userDataService: UserDataService,
    private fahrtenService: FahrtenService,
    public helperService: HelpService,
    public authService: AuthService
  ) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.userDataService
      .getUserDataById_Observable(this.fahrt.creatorId)
      .subscribe((data) => {
        this.user = data;
        this.loaded = true;
      });
  }

  buchen() {
    this.fahrtenService.acceptRide(this.fahrt);
  }
}
