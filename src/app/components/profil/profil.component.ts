import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  disname :string = "MAx Mustermann";
  vorname :string = "Max";
  email:string = "max@gmail.com";
  photoURL: string = "https://img.icons8.com/ios/100/000000/contract-job.png";
  emailVerified: boolean = false;

  defaultDate="1995-12-12";
  private user: any;


  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    console.log("ng debut")
    this.setData();
    this.photoURL = this.authService.userData.photoURL + '/assets/dummy-user.png';
    console.log("ng fin")

  }
  setData(){
      this.disname = this.authService.userData.displayName;
      this.email = this.authService.userData.email;
      this.photoURL = this.authService.userData.photoURL + '/assets/dummy-user.png';
  }


  onSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.photoURL = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

}
