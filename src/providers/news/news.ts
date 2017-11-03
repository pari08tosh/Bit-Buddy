import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class NewsProvider {

  apikey: String = '33aa14e2714c4395ad1ff7d14370a4c2';

  constructor(public http: Http) {
  }

  getHinduNews() {
    return this.http.get(`https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=${this.apikey}`)
    .map(res => res.json());
  }

  getToiNews() {
    return this.http.get(`https://newsapi.org/v1/articles?source=the-times-of-india&sortBy=top&apiKey=${this.apikey}`)
    .map(res => res.json());
  }

  getHackerNews() {
    return this.http.get(`https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=${this.apikey}`)
    .map(res => res.json());
  }



}
