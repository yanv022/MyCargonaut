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

  constructor(private userDataService: UserDataService) { }

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

}
