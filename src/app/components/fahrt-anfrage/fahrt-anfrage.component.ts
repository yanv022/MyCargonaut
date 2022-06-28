import { Component, OnInit } from '@angular/core';
import {FahrtenService} from "../../services/fahrten.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AnfrageSucheComponent} from "./anfrage-suche/anfrage-suche.component";
import {NeueAnfrageComponent} from "./neue-anfrage/neue-anfrage.component";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-fahrt-anfrage',
  templateUrl: './fahrt-anfrage.component.html',
  styleUrls: ['./fahrt-anfrage.component.scss']
})
export class FahrtAnfrageComponent implements OnInit {
  public isCollapsed = true
  public anfragen: any;
  date:Date=new Date();

  constructor(public fahrtenService: FahrtenService , public modalService: NgbModal,private afs: AngularFirestore) {

  }

  ngOnInit(): void {
    console.log("hhhhhhhhhhhhhhh");
    this.afs.collection("anfragen").valueChanges().subscribe(val =>{
      console.log(val);
      this.anfragen =val;
    })


  }

  newAnfrage(){
    const modalRef = this.modalService.open(NeueAnfrageComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openModal() {
    console.log(this.anfragen);
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(AnfrageSucheComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
