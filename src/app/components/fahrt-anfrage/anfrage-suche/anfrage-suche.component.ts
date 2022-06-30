import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-anfrage-suche',
  templateUrl: './anfrage-suche.component.html',
  styleUrls: ['./anfrage-suche.component.scss']
})
export class AnfrageSucheComponent implements OnInit {
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

  constructor(
    public activeModal: NgbActiveModal,
    private carsService: CarsService
  ) {
    this.cars = [
      {
        brand: 'Ford',
        color: 'blau',
        model: 'Focus',
        seats: '5',
        storageInKg: '500',
        type: 'combi',
        autoId: 'kRO6mCbnb5hScGXGThJt'
      },
      {
        brand: 'Opel',
        color: 'grün',
        model: 'Corsa',
        seats: '3',
        storageInKg: '200',
        type: 'combi',
        autoId: 'kRO6mCbnb5hScGXGThJt'
      }
    ];
  }
  ngOnInit() {
    this.carsService.getCarsOfUser('f29hRnOBQh1tb4AKZGev');
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  setCar(car: any) {
    this.selectedCar = car;
  }
}
