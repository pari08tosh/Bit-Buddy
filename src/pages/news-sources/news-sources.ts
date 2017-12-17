import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';

@Component({
  selector: 'page-news-sources',
  templateUrl: 'news-sources.html',
})
export class NewsSourcesPage {

  newsSources: Object = {};
  newsObservable: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private newsProvider: NewsProvider,
    private loadingCtrl: LoadingController,
  ) {
    this.newsSources = this.newsProvider.sources;
  }

  ionViewDidLoad() {
  }

  addSources() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
      });
      loading.present();

    this.newsObservable = this.newsProvider.getSources().subscribe(data => {
      console.log(data);
      for (let ii = 0; ii < data.length; ii++) {
        this.newsProvider.deleteSource(data[ii].id);
      }

      for(let key in this.newsSources) {
        if (this.newsSources.hasOwnProperty(key)) {
          if (this.newsSources[key].subscribe) {
            this.newsProvider.addSource(this.newsSources[key]);
          }
        }
      }
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.pop();
      }, 2000);
    })
  }
}
