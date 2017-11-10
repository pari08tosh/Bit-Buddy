import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TodoPage } from '../pages/todo/todo';
import { NewsPage } from '../pages/news/news';

import { SettingsPage } from '../pages/settings/settings';
import { WeatherPage } from '../pages/weather/weather';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationProvider } from '../providers/notification/notification';
import { AngularFireAuth } from 'angularfire2/auth';




@Component({
  templateUrl: 'app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;


  username: String = "";
  photoURL: String = "";

  pages: Array<{title: string, component: any, icon: string, class: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private backgroundMode: BackgroundMode,
    public ref: ChangeDetectorRef,
    private localNotifications: LocalNotifications,
    public notificationProvider: NotificationProvider,
    public afAuth: AngularFireAuth   
  ) {
    this.initializeApp();
    this.afAuth.authState.subscribe(user =>{
      if (user) {
        this.notificationProvider.enableNotifications();
        this.username = user.displayName;
        this.photoURL = user.photoURL;
      } else {
        this.username = "";
      }
      this.ref.detectChanges();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home', class: 'green' },
      { title: 'Todos', component: TodoPage, icon: 'list', class: '' },
      { title: 'Weather', component: WeatherPage, icon: 'partly-sunny', class: '' },
      { title: 'News', component: NewsPage, icon: 'paper', class: '' },
      { title: 'Settings', component: SettingsPage, icon: 'settings', class: '' }
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
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].title === page.title) {
        this.pages[i].class = 'green';
      } else {
        this.pages[i].class = '';
      }
    }
    this.nav.setRoot(page.component);
    this.ref.detectChanges();
  }
}
