import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor() { }

  isDate(potentialDate: any){
    return potentialDate instanceof Date;
  }
}
