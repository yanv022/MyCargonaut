import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.scss']
})
export class RegistrierenComponent implements OnInit {

  constructor( public authService: AuthService,
               public userService: UserService) { }

  ngOnInit(): void {
  }

  registrieren(name:string, username : string, gbDatum:string,  email:string, passwort: string){
    this.authService.setauth(name ,username , new Date(gbDatum))
    console.log(new Date(gbDatum));
    this.authService.SignUp(name,username,gbDatum,email,passwort);
  }

}
