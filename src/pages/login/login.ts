import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase'; 


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public firebaseProvider: FirebaseProvider,
  ) {
  }

  facebookLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.firebaseProvider.loginByFacebook((error) => {
      loading.dismiss();
      if (error) {
        return
      } else {
        this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward'});
      }
    })
  }

  googleLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.firebaseProvider.loginByGoogle((error) => {
      loading.dismiss();
      if (error) {
        return
      } else {
        this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward'});
      }
    })
  }
}
