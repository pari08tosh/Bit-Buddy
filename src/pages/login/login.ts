import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public facebook: Facebook,
    private googlePlus: GooglePlus,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public platform: Platform,
  ) {
  }

  facebookLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    if (this.platform.is('android') || this.platform.is('ios')) {
      this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
          .then( success => {
            loading.dismiss();
            this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward'});
          }).catch((error) => {
            loading.dismiss();
            console.log(JSON.stringify(error));
            this.handleError(error);
          });
      }).catch((error) => {
        loading.dismiss();
        this.handleError(error);
      });
    } else {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward'});
      }).catch((error) => {
        loading.dismiss();
        console.log(error);
        this.handleError(error);
       });
    }
  }

  googleLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    // For Android and Ios.
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.googlePlus.login({
        'webClientId': '935417274512-sf04s8s7ctkhpdj2t9aieold7uitmkh9.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then( success => {
            loading.dismiss();
            this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward'});
          }).catch((error) => {
            loading.dismiss();
            this.handleError(error);
          });
      }).catch((error) => {
        loading.dismiss();
        this.handleError(error);
      });
    } else {
      // For Browser

      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward'});
      }).catch((error) => {
        loading.dismiss();
        console.log(error);
        this.handleError(error);
       });
    }
  }


  handleError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `${ error.message }`,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
