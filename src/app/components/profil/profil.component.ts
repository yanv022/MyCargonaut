import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {


  defaultDate="1995-12-12";


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
