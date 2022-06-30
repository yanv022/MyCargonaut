import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {UserDataService} from "../../services/user-data.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditProfilComponent} from "./edit-profil/edit-profil.component";
import {ConfirmDeleteComponent} from "./confirm-delete/confirm-delete.component";

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
              public userDataservice: UserDataService,
              public modal: NgbModal,
              )
  {
    this.getuserdaten()
  }

  ngOnInit(): void {
  }
  setData(){
      this.disname = this.authService.userData.displayName;
      this.email = this.authService.userData.email;
      this.photoURL = this.authService.userData.photoURL + '/assets/dummy-user.png';
  }
  getuserdaten(){
    console.log('halo yann methode debut');
    const user = this.authService.userData;
    console.log('id = '+user.uid);
    this.userDataservice.getUserDataById_Observable(user.uid).subscribe((data)=>{
      console.log(data);
      console.log('fin methodehalo');
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
  openMoneyModal(): void {
    this.modal.open( EditProfilComponent, {
      animation: true,
      centered: true
    });
  }
  deleteuser(){
    const modalRef = this.modal.open( ConfirmDeleteComponent, {
      animation: true,
      centered: true,
    });
    modalRef.dismissed.toPromise().then(async (result) => {
      if (result) {
        await this.userDataservice.deleteUser();
      }
    })

  }

}
