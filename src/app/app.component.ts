import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Nav, Platform, IonicApp, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TodoPage } from '../pages/todo/todo';
import { NewsPage } from '../pages/news/news';
import { ExpenditurePage } from '../pages/expenditure/expenditure';
import { SettingsPage } from '../pages/settings/settings';
import { WeatherPage } from '../pages/weather/weather';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';




@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  username: String = "";
  photoURL: String = "";

  pages: Array<{title: string, component: any, icon: string, class: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public ref: ChangeDetectorRef,
    public afAuth: AngularFireAuth,
    private _app: App,
    private _ionicApp: IonicApp,
    private _menu: MenuController  
  ) {
    this.initializeApp();
    this.afAuth.authState.subscribe(user =>{
      FirebaseProvider.user = user;
      if (user) {
        this.rootPage = HomePage;
        this.username = user.displayName;
        this.photoURL = user.photoURL;
      } else {
        this.username = "";
        this.rootPage = LoginPage;
      }
      this.ref.detectChanges();
    });

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home', class: 'green' },
      { title: 'Todos', component: TodoPage, icon: 'list', class: '' },
      { title: 'Expenses', component: ExpenditurePage, icon: 'card', class: '' },      
      { title: 'Weather', component: WeatherPage, icon: 'partly-sunny', class: '' },
      { title: 'News', component: NewsPage, icon: 'paper', class: '' },
      { title: 'Settings', component: SettingsPage, icon: 'settings', class: '' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.setupBackButtonBehavior ();

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
    this.nav.setRoot(page.component, {}, { animate: true, direction: 'forward' });
    this.ref.detectChanges();
  }


  private setupBackButtonBehavior () {
    
    if (window.location.protocol !== "file:") {

      // Register browser back button action(s)
      window.onpopstate = (evt) => {

        // Close menu if open
        if (this._menu.isOpen()) {
          this._menu.close ();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this._ionicApp._loadingPortal.getActive() ||
          this._ionicApp._modalPortal.getActive() ||
          this._ionicApp._toastPortal.getActive() ||
          this._ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back
        if (this._app.getRootNav().canGoBack()) this._app.getRootNav().pop();

      };

      // Fake browser history on each view enter
      this._app.viewDidEnter.subscribe((app) => {
        history.pushState (null, null, "");
      });
    }
  }
}