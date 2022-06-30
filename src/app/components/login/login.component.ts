import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    config: NgbCarouselConfig
  ) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true
  }

  ngOnInit(): void {
  }

  onSubmit(email : string, passwort:string) {
  }
  zuRegistrierung(){
    this.router.navigate(['registrieren'])
  }
}
