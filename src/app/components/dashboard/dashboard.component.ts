import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {UserDataService} from "../../services/user-data.service";
import {FahrtenService} from "../../services/fahrten.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dateuser: Date = new Date("2010-01-16");
  userdaten: any;

  constructor(public authService: AuthService,
              public userDataservice: UserDataService,
              public fahrtenService: FahrtenService , public modalService: NgbModal) {

  }
  ngOnInit(): void {}

  getuserdaten(){
    console.log('halo yann methode debut');
    const user = this.authService.userData;console.log('id = ');

    console.log(user.uid);
    this.userDataservice.getUserDataById_Observable(user.uid).subscribe((data)=>{
      console.log(data);
      console.log('fin methodehalo');
    })
  }
}

