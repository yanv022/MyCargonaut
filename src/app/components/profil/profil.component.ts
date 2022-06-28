import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {UserDataService} from "src/app/services/user-data.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  disname :string = "Mustermann";
  vorname :string = "Max";
  email:string = "max@gmail.com";
  photoURL: string = "";
  emailVerified: boolean = false;
  defaultDate="1995-12-12";
  user: any;


  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.setData(this.authService.userData);
  }
  setData(user : any){
    if(user == this.authService.userData ){
      this.disname = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL + '/assets/dummy-user.png';
    }
  }

  url = 'https://img.icons8.com/ios/100/000000/contract-job.png';
  onSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

}
