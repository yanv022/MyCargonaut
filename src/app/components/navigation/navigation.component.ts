import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  test: any[]=[{
    abfahrt:"Ibrahim",
    wo: "berlin",
    ankunft:"Alvi",
    wohin: "Maruburg"
  },
    {
      abfahrt:"Ibrahim",
      wo: "berlin",
      ankunft:"Alvi",
      wohin: "Maruburg"
    },
    {
      abfahrt:"Ibrahim",
      wo: "berlin",
      ankunft:"Alvi",
      wohin: "Maruburg"
    },
    {
      abfahrt:"Ibrahim",
      wo: "berlin",
      ankunft:"Alvi",
      wohin: "Maruburg"
    }]


}
