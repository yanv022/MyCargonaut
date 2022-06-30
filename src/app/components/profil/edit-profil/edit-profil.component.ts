import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/user/auth.service";
import {UserDataService} from "../../../services/user-data.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {

  constructor(public authService: AuthService,
              public userDataservice: UserDataService,
              public activeModal: NgbActiveModal)
  { }

  ngOnInit(): void {
  }
  uptateuser(disname: string, username: string,gbdatum: string,email:string){
    this.userDataservice.uptate('name',disname);
    this.userDataservice.uptate('username',username);
    this.userDataservice.uptate('gbdatum',disname);
    this.userDataservice.uptate('email',disname);

  }

}
