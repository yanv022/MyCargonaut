import {Component, Input, OnInit} from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-single-fahrt',
  templateUrl: './single-fahrt.component.html',
  styleUrls: ['./single-fahrt.component.scss']
})
export class SingleFahrtComponent implements OnInit {
  @Input() fahrt: any;
  public user!: any;
  public loaded: boolean;

  constructor(private userDataService: UserDataService) {
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

  isDate(potentialDate: any){
    return potentialDate instanceof Date;
  }

}
