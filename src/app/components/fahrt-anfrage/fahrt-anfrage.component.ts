import { Component, OnInit } from '@angular/core';
import {FahrtenService} from "../../services/fahrten.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FahrtSucheComponent} from "../fahrt-list/fahrt-suche/fahrt-suche.component";

@Component({
  selector: 'app-fahrt-anfrage',
  templateUrl: './fahrt-anfrage.component.html',
  styleUrls: ['./fahrt-anfrage.component.scss']
})
export class FahrtAnfrageComponent implements OnInit {

  requests!: any;

  constructor(public fahrtenService: FahrtenService , public modalService: NgbModal) {
    this.getData();
    this.requests = [{wo: 'irgedwo', wohin: 'egal', ankunft: new Date(), abfahrt: new Date(), title: 'ich suche nichts'}]
  }

  ngOnInit(): void {
  }

  async getData() {

  }


  openModal() {

  }

  newRequest() {

  }
}
