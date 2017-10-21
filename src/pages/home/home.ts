import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnDestroy  {

  user: any;
  wish: String;
  userName: String;

  constructor(
    public navCtrl: NavController,
    public ref: ChangeDetectorRef,
  ) {
  }

  ionViewCanEnter() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return true;
      } else {
        this.navCtrl.setRoot(LoginPage);
        return false;
      }
    });
  }

  ngOnDestroy() {
    this.ref.detach();
  }

  ionViewDidLoad() {
    let date = new Date;
    let hour = date.getHours();
    if (hour >= 6 && hour < 12) {
      this.wish = `Good Morning`;
    } else {
      if (hour >= 12 && hour < 16 ) {
          this.wish = `Good Afternoon`;
      } else {
        this.wish = `Good Evening`;
      }
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userName = user.displayName.split(' ')[0];
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      }
    });
  }

}
