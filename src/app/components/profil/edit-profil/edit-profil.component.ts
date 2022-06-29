import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/user/auth.service";

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  uptateuser(disname: string, username: string,gbdatum: string,email:string){

  }

}
