import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TodoPage } from '../pages/todo/todo';
import { WriteTodoPage } from '../pages/write-todo/write-todo';
import { LoginPage } from '../pages/login/login';
import { EditTodoPage } from '../pages/edit-todo/edit-todo';
import { SettingsPage } from '../pages/settings/settings';
import { AddExpenditurePage } from '../pages/add-expenditure/add-expenditure';
import { EditExpenditurePage } from '../pages/edit-expenditure/edit-expenditure';
import { WeatherPage } from '../pages/weather/weather';
import { NewsPage } from '../pages/news/news';
import { ExpenditurePage } from '../pages/expenditure/expenditure';
import { DebtsPage } from '../pages/debts/debts';
import { AddDebtPage } from '../pages/add-debt/add-debt';
import { EditDebtPage } from '../pages/edit-debt/edit-debt';
import { NewsSourcesPage } from '../pages/news-sources/news-sources';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { firebaseConfig } from '../environment';
import * as firebase from "firebase";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AlertProvider } from '../providers/alert/alert';
import { NotificationProvider } from '../providers/notification/notification';
import { WeatherProvider } from '../providers/weather/weather';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { NewsProvider } from '../providers/news/news';
import * as Chart from 'chart.js'
import { TodoProvider } from '../providers/todo/todo';
import { ExpenditureProvider } from '../providers/expenditure/expenditure';

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodoPage,
    WriteTodoPage,
    LoginPage,
    EditTodoPage,
    SettingsPage,
    WeatherPage,
    NewsPage,
    ExpenditurePage,
    AddExpenditurePage,
    EditExpenditurePage,
    DebtsPage,
    AddDebtPage,
    EditDebtPage,
    NewsSourcesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'bitBuddy'),
    AngularFirestoreModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodoPage,
    WriteTodoPage,
    LoginPage,
    EditTodoPage,
    SettingsPage,
    WeatherPage,
    NewsPage,
    ExpenditurePage,
    AddExpenditurePage,
    EditExpenditurePage,
    DebtsPage,
    AddDebtPage,
    EditDebtPage,
    NewsSourcesPage
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
    InAppBrowser,
    TodoProvider,
    ExpenditureProvider
  ]
})
export class AppModule {}
