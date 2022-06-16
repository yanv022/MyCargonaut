import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  disname :string = "Mustermann";
  vorname :string = "Max";
  email:string = "max@gmail.com";
  photoURL: string = "";
  emailVerified: boolean = false;

  defaultDate="1995-12-12";
  private user: any;


  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.setData(this.authService.userData);
  }
  setData(user : any){
    if(user == this.authService.userData ){
      this.disname = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL + '/assets/dummy-user.png';
    }
  }

}
