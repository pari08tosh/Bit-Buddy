import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(
    public http: Http,
    public toastCtrl: ToastController,
  ) {
  }

alert(msg, duration) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: duration,
    position: 'bottom',
    cssClass: 'toast-class',
  });
  toast.present();
}

}
