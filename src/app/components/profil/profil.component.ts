import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  disname :string = "MAx Mustermann";
  vorname :string = "Max";
  username :string | undefined = "vide";
  email:string = "max@gmail.com";
  photoURL: string = "https://img.icons8.com/ios/100/000000/contract-job.png";
  emailVerified: boolean = false;

  defaultDate="1995-12-12";
  private user: any;


  constructor(public authService: AuthService,
              public userDataservice: UserDataService)
  {
    this.getuserdaten()
    console.log('das le cons = '+ this.user);
  }

  ngOnInit(): void {
    console.log("ng debut")
    //this.setData();
    this.photoURL = this.authService.userData.photoURL + '/assets/dummy-user.png';
    console.log("ng fin")
  }
  setData(){
      this.disname = this.authService.userData.displayName;
      this.email = this.authService.userData.email;
      this.photoURL = this.authService.userData.photoURL + '/assets/dummy-user.png';
  }
  async getuserdaten(){
    const id = this.authService.userData.uid;
    this.userDataservice.getUserDataById_Observable(id).subscribe((data)=>{
      this.user = data;
      this.username = data?.username;
      console.log('halo');
      console.log(this.user);
      console.log(data?.username);
      console.log(this.user?.username);
    })
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
