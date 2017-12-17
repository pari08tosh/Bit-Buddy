import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take'

@Injectable()
export class NewsProvider {

  apikey: String = 'fdcda269f5514f23b7c25de86dc59f75';
  newsCollection: AngularFirestoreCollection<any>;
  user: any;

  sources: Object = {
    bbcNews: {
      name: 'BBC News',
      code: 'bbc-news',
      icon: 'https://icons.better-idea.org/icon?url=http://www.bbc.co.uk/news&size=70..120..200',

    },
    cnn: {
      name: 'CNN',
      code: 'cnn',
      icon: 'https://icons.better-idea.org/icon?url=http://us.cnn.com&size=70..120..200',
    },
    alJazeera: {
      name: 'Al Jazeera',
      code: 'al-jazeera-english',
      icon: 'https://icons.better-idea.org/icon?url=http://www.aljazeera.com&size=70..120..200',
      description: 'News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.'
    },
    google: {
      name: 'Google News',
      code: 'google-news-in',
      icon: 'https://icons.better-idea.org/icon?url=https://news.google.com&size=70..120..200',
    },
    toi: {
      name: 'TOI',
      code: 'the-times-of-india',
      icon: 'https://icons.better-idea.org/icon?url=http://timesofindia.indiatimes.com&size=70..120..200',
    },
    hindu: {
      name: 'The Hindu',
      code: 'the-hindu',
      icon: 'https://icons.better-idea.org/icon?url=http://www.thehindu.com&size=70..120..200',
    },
    buzzfeed: {
      name: 'Buzzfeed',
      code: 'buzzfeed',
      icon: 'https://icons.better-idea.org/icon?url=https://www.buzzfeed.com&size=70..120..200',
    },
    entertainmentWeekly: {
      name: 'Entertainment Weekly',
      code: 'entertainment-weekly',
      icon: 'https://icons.better-idea.org/icon?url=http://www.ew.com&size=70..120..200',
    },
    ign: {
      name: 'IGN',
      code: 'ign',
      icon: 'https://icons.better-idea.org/icon?url=http://www.ign.com&size=70..120..200',
    },
    polygon: {
      name: 'Polygon',
      code: 'polygon',
      icon: 'https://icons.better-idea.org/icon?url=http://www.polygon.com&size=70..120..200',
    },
    mtv: {
      name: 'MTV News',
      code: 'mtv-news',
      icon: 'https://icons.better-idea.org/icon?url=http://www.mtv.com/news&size=70..120..200',
    },
    nationalGeographic: {
      name: 'National Geographic',
      code: 'national-geographic',
      icon: 'https://icons.better-idea.org/icon?url=http://news.nationalgeographic.com&size=70..120..200',
    },
    newScientist: {
      name: 'New Scientist',
      code: 'new-scientist',
      icon: 'https://icons.better-idea.org/icon?url=https://www.newscientist.com/section/news&size=70..120..200',
    },
    techRadar: {
      name: 'TechRadar',
      code: 'techradar',
      icon: 'https://icons.better-idea.org/icon?url=http://www.techradar.com&size=70..120..200'
    },
    theVerge: {
      name: 'The Verge',
      code: 'the-verge',
      icon: 'https://icons.better-idea.org/icon?url=http://www.theverge.com&size=70..120..200'
    },
    hackerNews: {
      name: 'Hacker News',
      code: 'hacker-news',
      icon: 'https://icons.better-idea.org/icon?url=https://news.ycombinator.com&size=70..120..200',
    },
    wired: {
      name: 'Wired',
      code: 'wired',
      icon: 'https://icons.better-idea.org/icon?url=https://www.wired.com&size=70..120..200',
    },
    bbcSport: {
      name: 'BBC Sport',
      code: 'bbc-sport',
      icon: 'https://icons.better-idea.org/icon?url=http://www.bbc.co.uk/sport&size=70..120..200',
    },
    espn: {
      name: 'ESPN',
      code: 'espn',
      icon: 'https://icons.better-idea.org/icon?url=http://espn.go.com&size=70..120..200',
    },
    cnbc: {
      name: 'CNBC',
      code: 'cnbc',
      icon: 'https://icons.better-idea.org/icon?url=http://www.cnbc.com&size=70..120..200',
    },
    theEconomist: {
      name: 'The Economist',
      code: 'the-economist',
      icon: 'https://icons.better-idea.org/icon?url=http://www.economist.com&size=70..120..200',
    }
  }

  constructor(
    public http: Http,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe(user => {
      this.user = user;
      if (user) {
        this.newsCollection = this.db.collection<any>(`users/${ user.uid }/news`); 
      }
    });
  }

  getNews(code) {
    return this.http.get(`https://newsapi.org/v2/top-headlines?sources=${code}&apiKey=${this.apikey}`)
    .map(res => res.json());
  }

  getSources() {
    return this.db.collection<any>(`users/${ this.user.uid }/news`).snapshotChanges().take(1).map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  addSource(source) {
    this.newsCollection.add(source);
  }

  deleteSource(id) {
    this.newsCollection.doc(id).delete();    
  }

}
