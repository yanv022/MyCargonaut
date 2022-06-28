import { Component, OnInit } from '@angular/core';
import { FahrtenService } from 'src/app/services/fahrten.service';
import {FahrtSucheComponent} from "./fahrt-suche/fahrt-suche.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HelpService} from "src/app/services/help.service";
import {PaymentService} from "src/app/services/payment.service";

@Component({
  selector: 'app-fahrt-list',
  templateUrl: './fahrt-list.component.html',
  styleUrls: ['./fahrt-list.component.scss']
})
export class FahrtListComponent implements OnInit {
  public isCollapsed = true
  public fahrten!: any;
  date:Date=new Date();

  constructor(public fahrtenService: FahrtenService , public modalService: NgbModal, private helperService: HelpService,
              public paymentService: PaymentService) {
   this.getData();
  }

  ngOnInit(): void {
  }

  async getData() {
    try{
      await this.fahrtenService.getAllRides().forEach((rideDocPromisses)=>{
        Promise.all(rideDocPromisses).then((rideDocument)=> {
          let fahrten = this.helperService.firebaseDateToNormalDate(rideDocument, ["ankunft", "abfahrt"]);
          fahrten.map((fahrt)=>{
            if(!('price' in fahrt)){
              fahrt.price = 0;
              return fahrt;
            }
          })
          this.fahrten = fahrten.sort(function(a,b){
            return a.abfahrt - b.abfahrt;
          });
        })
      });
      }
    catch (e) {
      console.log('err');
    }
  }



  newRide(){
    this.fahrtenService.openAddModal();
  }
  openModal() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(FahrtSucheComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
