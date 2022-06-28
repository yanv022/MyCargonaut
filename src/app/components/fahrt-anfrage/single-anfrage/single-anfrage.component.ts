import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-single-anfrage',
  templateUrl: './single-anfrage.component.html',
  styleUrls: ['./single-anfrage.component.scss']
})
export class SingleAnfrageComponent implements OnInit {

  @Input() anfrage: any;

  isDate(potentialDate: any){
    return potentialDate instanceof Date;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
