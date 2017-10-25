import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

  currentCity: any = [];
  currentWeather: any = [];
  dailyWeather: any = [];
  showWeather: Boolean;
  date1: String;
  date2: String;
  date3: String;
  month: Array<String> = [];



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public weatherProvider: WeatherProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public ref: ChangeDetectorRef,
  ) {
    this.month[0] = "Jan";
    this.month[1] = "Feb";
    this.month[2] = "Mar";
    this.month[3] = "Apr";
    this.month[4] = "May";
    this.month[5] = "Jun";
    this.month[6] = "Jul";
    this.month[7] = "Aug";
    this.month[8] = "Sep";
    this.month[9] = "Oct";
    this.month[10] = "Nov";
    this.month[11] = "Dec";
  }

  ionViewWillEnter(){
    let d = new Date();
    this.date1 = `${d.getDate()+1} ${this.month[d.getMonth()]}`;
    this.date2 = `${d.getDate()+2} ${this.month[d.getMonth()]}`;
    this.date3 = `${d.getDate()+3} ${this.month[d.getMonth()]}`;

    this.showWeather = false;
    let loading = this.loadingCtrl.create({
    content: 'Fetching data from satelite'
    });
    loading.present();
    this.storage.get('location').then(city => {
      if (city) {
        this.currentCity = city;
      } else
      {
        this.currentCity.name = "Ranchi";
        this.currentCity.id = "1258526";
        this.currentCity.gps = false;
      }
    this.weatherProvider.getCurrentWeather(this.currentCity).subscribe(
      data => {
        this.currentWeather = data;
        this.weatherProvider.getDailyWeather(this.currentCity).subscribe(
        data => {
          this.dailyWeather = data;
          this.showWeather = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
          loading.dismiss();
        },
      err => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error Fetching Data',
          subTitle: 'We could not get your data. Please try again',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    },
    err => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error Fetching Data',
        subTitle: 'We could not get your data. Please try again',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  );
    });
  }
}
