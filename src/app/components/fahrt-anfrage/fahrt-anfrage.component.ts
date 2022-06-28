import { Component, OnInit } from '@angular/core';
import {FahrtenService} from "../../services/fahrten.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FahrtSucheComponent} from "../fahrt-list/fahrt-suche/fahrt-suche.component";
import {AnfragenService} from "src/app/services/anfragen.service";
import {HelpService} from "src/app/services/help.service";

@Component({
  selector: 'app-fahrt-anfrage',
  templateUrl: './fahrt-anfrage.component.html',
  styleUrls: ['./fahrt-anfrage.component.scss']
})
export class FahrtAnfrageComponent implements OnInit {

  requests!: any;

  constructor(public anfragenService: AnfragenService, public modalService: NgbModal, private helperService: HelpService,) {
    this.getData();
  }

  ngOnInit(): void {
  }

  async getData() {
    await this.anfragenService.getAllRequests().forEach((requestDocuments) => {
      let requests = this.helperService.firebaseDateToNormalDate(requestDocuments, ["ankunft", "abfahrt"]);
      this.requests = requests.sort(function(a: { abfahrt: any; }, b: { abfahrt: any; }){
        return a.abfahrt - b.abfahrt;
      });
      })
  }


  openModal() {

  }

  newRequest() {
    this.anfragenService.newRequestModal();
  }

}
