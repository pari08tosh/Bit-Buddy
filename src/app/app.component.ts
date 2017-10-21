import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TodoPage } from '../pages/todo/todo';
import { SettingsPage } from '../pages/settings/settings';
import { WeatherPage } from '../pages/weather/weather';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationProvider } from '../providers/notification/notification';



@Component({
  templateUrl: 'app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;


  username: String = "";
  photoURL: String = "";

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private backgroundMode: BackgroundMode,
    public ref: ChangeDetectorRef,
    private localNotifications: LocalNotifications,
    public notificationProvider: NotificationProvider,


  ) {
    this.initializeApp();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.notificationProvider.enableNotifications();
        this.username = user.displayName;
        this.photoURL = user.photoURL;
        this.ref.detectChanges();
      } else {
        // No user is signed in.
      }
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home'},
      { title: 'Attendence', component: ListPage, icon: 'checkbox-outline' },
      { title: 'Expenditure', component: ListPage, icon: 'card' },
      { title: 'Todos', component: TodoPage, icon: 'list' },
      { title: 'Weather', component: WeatherPage, icon: 'partly-sunny' },
      { title: 'Settings', component: SettingsPage, icon: 'settings' }
    ];
  }


  initializeApp() {
    this.platform.ready().then(() => {

      // Enable Background Mode on back button
      this.platform.registerBackButtonAction(() => {
        if (this.backgroundMode.isEnabled()) {
          if (!this.nav.canGoBack()) {
            this.backgroundMode.moveToBackground();
          } else {
            this.nav.pop();
          }
        }
        else {
          if (this.nav.canGoBack()) {
            this.nav.pop();
          } else {
            this.platform.exitApp();
          }
        }
      });

      this.localNotifications.on('click' , notification => {
        this.localNotifications.clearAll();
        if (notification.id === 1 || notification.id === 10) {
          this.nav.setRoot(TodoPage);
        }
      });

      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#0f715e');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
