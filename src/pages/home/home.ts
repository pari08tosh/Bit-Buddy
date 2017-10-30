import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { TodoPage } from '../todo/todo';
import { SettingsPage } from '../settings/settings';
import { NewsPage } from '../news/news';
import { WeatherPage } from '../weather/weather';
import { WeatherProvider } from '../../providers/weather/weather';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import * as firebase from 'firebase/app';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: any;
  wish: String;
  userName: String;
  photoURL: String;
  currentCity: any = [];
  currentWeather: any = [];
  showWeather: Boolean = false;
  quote: String = '';
  author: String = '';
  showContent: Boolean = false;
  todoCount: number;
  gotTodoData: Boolean;
  firstTodo: String;
  todoObservable: any;

  constructor(
    public navCtrl: NavController,
    public ref: ChangeDetectorRef,
    public weatherProvider: WeatherProvider,
    public loadingCtrl: LoadingController,
    public firebaseProvider: FirebaseProvider,
  ) {
    this.user = null;
  }

  ionViewCanEnter() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
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

    this.showContent = false;
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
        this.photoURL = user.photoURL;
        this.todoObservable = this.firebaseProvider.getTodos().subscribe(data => {
          console.log(data);
          this.todoCount = data.length;
          if (data.length !== 0) {
            this.firstTodo = data[0].heading;
          }
          this.gotTodoData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        });
      }
    });

    this.weatherProvider.getQuote().subscribe(
      data => {
        this.showContent = true;
        this.quote = data.quote;
        this.author = data.author;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      },
      err => {
        this.showContent = true;
        this.quote = `Oops! We ran out of quotes`;
        this.author = `Developer`;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      }
    )
  }

  // weather to be loaded on each page load
  ionViewDidEnter() {
    this.showWeather = false;
    console.log("entered page");
    this.weatherProvider.getLocation(city => {
      this.currentCity = city;
      this.weatherProvider.getCurrentWeather(this.currentCity).subscribe(
        data => {
          this.currentWeather = data;
          this.showWeather = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        }
      );
    });
  }

  settingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  todoPage() {
    this.navCtrl.push(TodoPage);
  }

  expensesPage() {
    this.navCtrl.push(TodoPage);
  }

  attendencePage() {
    this.navCtrl.push(TodoPage);
  }

  newsPage() {
    this.navCtrl.push(NewsPage);
  }

  weatherPage() {
    this.navCtrl.push(WeatherPage);
  }

}
