import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
declare var navigator: any;
declare var Conection: any;

@Injectable()
export class NetworkProvider {

  constructor(
    private platform: Platform,
  ) {

  }
  get isOnline(): boolean {
    if (this.platform.is('cordova')) {
      if (navigator.conection && navigator.conection.type) {
        return (navigator.conection.type != Conection.UNKKONW && navigator.conection.type != Conection.NONE)
      } else
        return true;
    } else
      return navigator.onLine;
  }
}
