import { Component, OnInit } from '@angular/core';
import { FahrtenService } from 'src/app/services/fahrten.service';

@Component({
  selector: 'app-fahrt-list',
  templateUrl: './fahrt-list.component.html',
  styleUrls: ['./fahrt-list.component.scss']
})
export class FahrtListComponent implements OnInit {
  public isCollapsed = true
  date:Date=new Date();

  constructor(public fahrtenService: FahrtenService) { }

  ngOnInit(): void {
  }

  isDate(potentialDate: any){
     return potentialDate instanceof Date;
  }


}
