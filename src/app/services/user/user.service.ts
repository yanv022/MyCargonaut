import { Injectable } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public authService: AuthService) {}
  setUserData(name: string, email: string, imageUrl: string) {
    const db = getDatabase();
    set(ref(db, 'users/' + this.authService.userData.uid), {
      displayName: name,
      email: email,
      photoURL: imageUrl
    });
  }

  setname(name: String) {
    this.authService.userData.displayName = 'je teste';
  }
}
