import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { Output, EventEmitter } from '@angular/core';
import {CarsService} from "src/app/services/cars.service";


@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})


export class AddModalComponent implements OnInit {
  @Input() name: any;
  title!: string;
  where!: string;
  to!: string;
  date!: any;
  time!: any;
  description!: string;
  cars!: any[];
  selectedCar!: any;
  @Output() submit = new EventEmitter<{}>();



  constructor(public activeModal: NgbActiveModal, private carsService: CarsService) {
    this.cars = [{brand: "Ford", color: "blau", model:"Focus", seats:"5", storageInKg: "500", type:"combi", autoId: 'kRO6mCbnb5hScGXGThJt'},
      {brand: "Opel", color: "grün", model:"Corsa", seats:"3", storageInKg: "200", type:"combi", autoId: 'kRO6mCbnb5hScGXGThJt'}
    ]
  }

  ngOnInit(): void {
    //get user ID
    this.carsService.getCarsOfUser('f29hRnOBQh1tb4AKZGev');
  }


    //TODO: 2. datum hinzufügen für ankunft
    submitData(){

      if(this.title != undefined && this.where.length != undefined && this.to.length != undefined && this.date != undefined
          &&this.time != undefined && this.description != undefined && this.selectedCar != undefined) {
        let fahrt = {abfahrt: new Date(), wo: this.where, ankunft: new Date(),
          wohin: this.to, name: this.title, creatorId: 'f29hRnOBQh1tb4AKZGev', autoId: this.selectedCar.autoId}
        this.submit.emit(fahrt);
      } else {
        console.log('select values');
      }
    }

    setCar(car: any){
      this.selectedCar = car;
    }



}
