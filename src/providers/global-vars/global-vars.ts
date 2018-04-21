import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalVarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalVarsProvider {

  private server_name: string;
  private timeOut: number;

  constructor() {
    this.server_name = "http://localhost:3000/";
    this.timeOut = 5000;
  }

  getServerName() {
    return this.server_name;
  }

  getTimeOut() {
    return this.timeOut;
  }

}
