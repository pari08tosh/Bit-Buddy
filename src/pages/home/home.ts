import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { TodoPage } from '../todo/todo';
import { SettingsPage } from '../settings/settings';
import { WeatherPage } from '../weather/weather';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnDestroy  {

  user: any;
  wish: String;
  userName: String;
  photoURL: String;
  backgroundURL: any;
  currentCity: any = [];
  currentWeather: any = [];
  showWeather: Boolean = false;
  quote: String = '';
  author: String = '';
  showContent: Boolean = false;
  todosRef: any;
  todoCount: number;
  gotTodoData: Boolean;
  firstTodo: any;

  constructor(
    public navCtrl: NavController,
    public ref: ChangeDetectorRef,
    public storage: Storage,
    public weatherProvider: WeatherProvider,
    public loadingCtrl: LoadingController,
  ) {
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
        let loading = this.loadingCtrl.create({
          content: 'Fetching your data'
        });
        loading.present();

        this.userName = user.displayName.split(' ')[0];
        this.photoURL = user.photoURL;

        this.todosRef = firebase.database().ref(`todos/${ user.uid }`);
        this.todosRef.orderByChild('deadline').on('value', data => {
          console.log(`got todo data in home page`);
          this.todoCount = 0;
          this.firstTodo = null;
          this.gotTodoData = false;
          data.forEach((todo) => {
            ++this.todoCount;
            if (!this.firstTodo) {
              this.firstTodo = todo.val().heading;
            }
          });
          this.gotTodoData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
          loading.dismiss();
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
    this.storage.get('location').then(city => {
      if (city) {
        this.currentCity = city;
      } else
        {
          console.log()
          this.currentCity.name = "Ranchi";
          this.currentCity.id = "1258526";
          this.currentCity.gps = false;
        }
    this.weatherProvider.getCurrentWeather(this.currentCity).subscribe(
      data => {
        console.log(`found weather`);
        this.currentWeather = data;
        this.showWeather = true;
        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
      });
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

  weatherPage() {
    this.navCtrl.push(WeatherPage);
  }

  ionViewWillUnload() {
    console.log(`exit from home page`);
    if( this.todosRef ) {
      this.todosRef.off();
    }
  }

}
