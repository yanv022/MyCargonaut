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
  setData( name:string, email:string, passwort: string){
    this.authService.SignUp(email,passwort);

    this.userService.setname(name);

  }

}
