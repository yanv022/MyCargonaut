import {Component, Input, OnInit} from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {BuchenComponent} from "../buchen/buchen.component";
import {HelpService} from "src/app/services/help.service";

@Component({
  selector: 'app-single-fahrt',
  templateUrl: './single-fahrt.component.html',
  styleUrls: ['./single-fahrt.component.scss']
})
export class SingleFahrtComponent implements OnInit {
  @Input() fahrt: any;
  public user!: any;
  public loaded: boolean;

  constructor(private userDataService: UserDataService, private modalService: NgbModal, public helperService: HelpService) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.userDataService.getUserDataById_Observable(this.fahrt.creatorId).subscribe(
        (data)=>{
          this.user = data;
          this.loaded = true;
        }
    )
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
