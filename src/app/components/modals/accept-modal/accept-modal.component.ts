import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-accept-modal',
  templateUrl: './accept-modal.component.html',
  styleUrls: ['./accept-modal.component.scss']
})
export class AcceptModalComponent implements OnInit {
  @Input() name!: string;
  @Input() data: any;
  @Input() indicator: any;
  @Output() submit = new EventEmitter<{}>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  accept() {
    this.submit.emit(this.data);
    this.activeModal.close();
  }
}
