import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LoginPage } from '../login/login';
import { NotificationProvider } from '../../providers/notification/notification';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation'
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  cityName: String;
  cityId: String;
  lon: String;
  lat: String;
  searchList: any = [];
  searchString: String;
  showList: Boolean;
  currentCity: Boolean;
  gps: Boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backgroundMode: BackgroundMode,
    public notificationProvider: NotificationProvider,
    private weatherProvider: WeatherProvider,
    private storage: Storage,
    private geolocation: Geolocation,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ref: ChangeDetectorRef,
    public firebaseProvider: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.showList = false;

    this.currentCity = true;
    this.storage.get('location').then(city => {
      if (city) {
        this.lon = city.coord.lon;
        this.lat = city.coord.lat;
        this.gps = city.gps;
        if (!city.gps) {
          this.cityName = city.name;
          this.cityId = city.id;
        }
      } else {
        this.gps = false;
        this.cityName = "Ranchi";
        this.cityId = "1258526";
        this.lon = "85.333328";
        this.lat = "23.35";
      }
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    });
  }

  getAndStoreLocation() {
    let loading = this.loadingCtrl.create({
    content: 'Determining Your Location'
    });
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loading.dismiss();
      const city = {
        gps: true,
        coord: {
          lon: String(resp.coords.longitude),
          lat: String(resp.coords.latitude),
        },
      };
      this.storage.set('location', city);
      this.gps = true;
      this.lon =  String(resp.coords.longitude);
      this.lat =  String(resp.coords.latitude);
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }).catch((error) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Location Not Found',
        subTitle: 'We could not determine your location, please check your gps settings',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    });
  }

  onInput() {
    this.currentCity = false;
    this.searchList = this.weatherProvider.searchCities(this.searchString);
    this.showList = true;
  }


  selectCity(city) {
    city.gps = false;
    this.storage.set('location', city);
    this.cityName = city.name;
    this.cityId = city.id;
    this.lon = city.coord.lon;
    this.lat = city.coord.lat;
    this.gps = city.gps;
    this.showList = false;
    this.searchString = "";
    this.currentCity = true;
  }


  logoutFunc() {
    this.firebaseProvider.logout(() => {
      this.notificationProvider.disableNotifications();
      this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'forward'});
    });
  }

}
