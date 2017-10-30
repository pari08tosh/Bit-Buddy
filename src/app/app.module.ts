import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TodoPage } from '../pages/todo/todo';
import { WriteTodoPage } from '../pages/write-todo/write-todo';
import { LoginPage } from '../pages/login/login';
import { EditTodoPage } from '../pages/edit-todo/edit-todo';
import { SettingsPage } from '../pages/settings/settings';
import { WeatherPage } from '../pages/weather/weather';
import { NewsPage } from '../pages/news/news';
import * as inshorts from 'inshorts';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { firebaseConfig } from '../environment';
import * as firebase from "firebase";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AlertProvider } from '../providers/alert/alert';
import { NotificationProvider } from '../providers/notification/notification';
import { WeatherProvider } from '../providers/weather/weather';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { NewsProvider } from '../providers/news/news';

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TodoPage,
    WriteTodoPage,
    LoginPage,
    EditTodoPage,
    SettingsPage,
    WeatherPage,
    NewsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'bitBuddy'),
    AngularFirestoreModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TodoPage,
    WriteTodoPage,
    LoginPage,
    EditTodoPage,
    SettingsPage,
    WeatherPage,
    NewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    AlertProvider,
    BackgroundMode,
    LocalNotifications,
    NotificationProvider,
    WeatherProvider,
    Geolocation,
    FirebaseProvider,
    NewsProvider,
  ]
})
export class AppModule {}
