import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {UserDataService} from "src/app/services/user/user-data.service";
import {FahrtenService} from "../../services/fahrten.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dateuser: Date = new Date("2010-01-16");
  user: any;

  constructor(public authService: AuthService,
              public userDataservice: UserDataService,
              public fahrtenService: FahrtenService , public modalService: NgbModal) {}
  ngOnInit(): void {}

  getuserdaten(){
    const id = this.authService.userData.uid;
    this.userDataservice.getUserDataById_Observable(id).subscribe((data)=>{
      this.user = data;
      console.log('halo');
      console.log(data);
      console.log(data?.username);
    })
  }
}

