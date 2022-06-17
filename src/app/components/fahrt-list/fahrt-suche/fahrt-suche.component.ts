import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fahrt-suche',
  templateUrl: './fahrt-suche.component.html',
  styleUrls: ['./fahrt-suche.component.scss']
})
export class FahrtSucheComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) {}
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
