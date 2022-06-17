import {Component, Input, OnInit} from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {BuchenComponent} from "../buchen/buchen.component";

@Component({
  selector: 'app-single-fahrt',
  templateUrl: './single-fahrt.component.html',
  styleUrls: ['./single-fahrt.component.scss']
})
export class SingleFahrtComponent implements OnInit {
  @Input() fahrt: any;
  public user!: any;

  constructor(private userDataService: UserDataService,public modalService: NgbModal) { }

  ngOnInit(): void {
    this.userDataService.getUserDataById_Observable(this.fahrt.creatorId).subscribe(
        (data)=>{
          this.user = data;
        }
    )
  }

  isDate(potentialDate: any){
    return potentialDate instanceof Date;
  }
  buchen(){
      const modalRef = this.modalService.open(BuchenComponent);
      modalRef.result.then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    }

}
