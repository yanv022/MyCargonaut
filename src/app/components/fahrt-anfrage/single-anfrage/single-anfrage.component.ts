import {Component, Input, OnInit} from '@angular/core';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-single-anfrage',
  templateUrl: './single-anfrage.component.html',
  styleUrls: ['./single-anfrage.component.scss']
})
export class SingleAnfrageComponent implements OnInit {

  @Input() request!: any;

  constructor(public helperService: HelpService) { }

  ngOnInit(): void {
  }

}
