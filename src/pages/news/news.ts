import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { News } from '../../models/models';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  segment: String;
  newsArray: Array<News>;
  error: Boolean;
  haveData: Boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public newsProvider: NewsProvider,
    public ref: ChangeDetectorRef,    
    private iab: InAppBrowser
  ) {
    this.segment = 'hindu';
    this.error = false;
    this.haveData = false;
  }


  segmentChanged(event) {
    this.haveData = false;
    this.error = false;
    if (event._value == 'hindu') {
      this.newsProvider.getHinduNews().subscribe(
        data => {
          console.log(data);
          if (data.status === 'ok') {
            this.newsArray = data.articles;
          } else {
            this.error = true;
          }
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        },
        err => {
          console.log(`Error fetching news
          ${ err }`);
          this.error = true;
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        }
      )
    }
    if (event._value == 'toi') {
      this.newsProvider.getToiNews().subscribe(
        data => {
          console.log(data);
          if (data.status === 'ok') {
            this.newsArray = data.articles;
          } else {
            this.error = true;
          }
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        },
        err => {
          console.log(`Error fetching news
          ${ err }`);
          this.error = true;
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        }
      )
    }
    if (event._value == 'hacker') {
      this.newsProvider.getHackerNews().subscribe(
        data => {
          console.log(data);
          if (data.status === 'ok') {
            this.newsArray = data.articles;
          } else {
            this.error = true;
          }
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        },
        err => {
          console.log(`Error fetching news
          ${ err }`);
          this.error = true;
          this.haveData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        }
      )
    }
  }

  ionViewWillEnter() {
    this.newsProvider.getHinduNews().subscribe(
      data => {
        console.log(data);
        if (data.status === 'ok') {
          this.newsArray = data.articles;
        } else {
          this.error = true;
        }
        this.haveData = true;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      },
      err => {
        console.log(`Error fetching news
        ${ err }`);
        this.error = true;
        this.haveData = true;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      }
    )
  }

  newsClick(url) {
    const browser = this.iab.create(url);
  }

}
