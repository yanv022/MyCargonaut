import { Component, OnInit } from '@angular/core';
import { FahrtenService } from 'src/app/services/fahrten.service';

@Component({
  selector: 'app-fahrt-list',
  templateUrl: './fahrt-list.component.html',
  styleUrls: ['./fahrt-list.component.scss']
})
export class FahrtListComponent implements OnInit {
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



  newRide(){
    this.fahrtenService.openAddModal();
  }


}
