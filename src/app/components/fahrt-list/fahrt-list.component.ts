import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fahrt-list',
  templateUrl: './fahrt-list.component.html',
  styleUrls: ['./fahrt-list.component.scss']
})
export class FahrtListComponent implements OnInit {
  public isCollapsed = true
  date:Date=new Date();

  constructor() { }

  ngOnInit(): void {
  }

  fahrtList: any[]=[{
    abfahrt:"9uhr00",
    wo: "berlin",
    ankunft:"Berlin",
    wohin: "12uhr00",
    name : "Max MusterMan"
  },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    }
  ]


}
