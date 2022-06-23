import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  date: Date = new Date("2010-01-16");


  constructor(public authService: AuthService,
              public userDataservice: UserDataService) {}
  ngOnInit(): void {}
}
