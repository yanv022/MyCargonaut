import {Component, OnInit, Type} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserDataService} from "../../../services/user-data.service";

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(config: NgbModalConfig,public modal: NgbActiveModal,
              public userDataservice: UserDataService) {
    config.backdrop = 'static';
    config.keyboard = false;

  }

  ngOnInit(): void {
  }
  delete(){
    this.modal.dismiss('cancel click');
    this.userDataservice.deleteUser();
  }


}
