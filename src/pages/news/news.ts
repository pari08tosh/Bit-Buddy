import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  segment: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.segment = 'national';
  }


  segmentChanged(event) {
    console.log(event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
