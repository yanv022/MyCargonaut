import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { FahrtenService } from 'src/app/services/fahrten.service';
import firebase from "firebase/compat";

@Component({
  selector: 'app-fahrt-list',
  templateUrl: './fahrt-list.component.html',
  styleUrls: ['./fahrt-list.component.scss']
})
export class FahrtListComponent implements OnInit {

  title = 'ng-bootstrap-modal-demo';
  closeResult = '';
  content = ''

  constructor(private modalService: NgbModal){
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  public isCollapsed = true
  public fahrten!: any;
  date:Date=new Date();

  constructor(public fahrtenService: FahrtenService) {
   this.getData();
  }

  ngOnInit(): void {
  }

  async getData() {
    try{
      await this.fahrtenService.getAllRides().forEach((rideDocPromisses)=>{
        Promise.all(rideDocPromisses).then((rideDocument)=> {
          this.fahrten = rideDocument.map(el => {
            if(el.ankunft){
              el.ankunft = el.ankunft.toDate();
            }
            if(el.abfahrt){
              el.abfahrt = el.abfahrt.toDate();
            }
            return el;
          });
        })
      });
      }
    catch (e) {
      console.log('err');
    }
  }

  isDate(potentialDate: any){
     return potentialDate instanceof Date;
  }

  newRide(){
    this.fahrtenService.openAddModal();
  }


}
