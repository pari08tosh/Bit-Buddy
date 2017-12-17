import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { News } from '../../models/models';
import { NewsSourcesPage } from '../news-sources/news-sources';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  segment: String;
  newsArray: Array<News> = [];
  error: Boolean = false;
  haveData: Boolean = false;
  sourcesArray: any[] = [];
  currentIndex: number = 0;
  haveSources: Boolean = false;

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

  swipe(event) {
    console.log(`swipe registered`);
    if (event.direction == '2') {
      if (this.currentIndex < this.sourcesArray.length - 1) {
        this.segment = String(this.currentIndex + 1);
        return this.segmentChanged({ _value: this.segment});
      } else {
        return false;
      }
    }
    if (event.direction == '4') {
      if (this.currentIndex > 0) {
        this.segment = String(this.currentIndex - 1);
        return this.segmentChanged({ _value: this.segment});
      } else {
        return false;
      }
    }
  };


  segmentChanged(event) {
    console.log(this.segment);
    this.haveData = false;
    this.error = false;
    this.currentIndex = Number(event._value);
    this.newsProvider.getNews(this.sourcesArray[this.currentIndex].code).subscribe(
      data => {
        if (data.status === 'ok') {
          this.newsArray = data.articles;
          console.log(this.newsArray);
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

  ionViewDidEnter() {
    this.haveData = false;
    this.haveSources = false;
    this.newsProvider.getSources().subscribe(data => {
      this.sourcesArray = data;
      this.haveSources = true;
      this.currentIndex = 0;
      console.log(this.sourcesArray);
      if (data.length !== 0) {
        this.segment = '0';
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
        this.segmentChanged({_value: '0'}); 
      } else {
        this.haveData = true;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      }
    })
  }

  newsClick(url) {
    const browser = this.iab.create(url);
  }

  newsSources() {
    this.navCtrl.push(NewsSourcesPage);
  }

}
