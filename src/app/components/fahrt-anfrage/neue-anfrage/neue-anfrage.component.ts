import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {CarsService} from "../../../services/cars.service";
import {AuthService} from "../../../services/user/auth.service";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-neue-anfrage',
  templateUrl: './neue-anfrage.component.html',
  styleUrls: ['./neue-anfrage.component.scss']
})
export class NeueAnfrageComponent implements OnInit {

  @Input() name: any;
  title!: string;
  where!: string;
  to!: string;
  dateAnkunft!: any;
  dateAbfahrt!: any;
  timeAnkunft!: any;
  timeAbfahrt!: any;
  description!: string;
  cars!: any[];
  selectedCar!: any;
  @Output() submit = new EventEmitter<{}>();



  constructor(public activeModal: NgbActiveModal, private carsService: CarsService, private authService: AuthService, private alertService: AlertService) {

  }

  setCar(car: any){
    console.log(car);
    this.selectedCar = car;
  }

  ngOnInit(): void {
  }


}
