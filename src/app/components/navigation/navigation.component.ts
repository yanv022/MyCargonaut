import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

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
