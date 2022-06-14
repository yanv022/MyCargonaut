import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

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
  date:Date=new Date();



  ngOnInit(): void {
  }

  fahrtList: any[]=[{
    abfahrt:"9uhr00",
    wo: "berlin",
    ankunft:"Berlin",
    wohin: "12uhr00",
    name : "Max MusterMan"
  },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    },
    {
      abfahrt:"9uhr00",
      wo: "berlin",
      ankunft:"Berlin",
      wohin: "12uhr00",
      name : "Max MusterMan"
    }
  ]


}
