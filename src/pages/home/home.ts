import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TodoPage } from '../todo/todo';
import { SettingsPage } from '../settings/settings';
import { NewsPage } from '../news/news';
import { WeatherPage } from '../weather/weather';
import { DebtsPage } from '../debts/debts';
import { WeatherProvider } from '../../providers/weather/weather';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TodoProvider } from '../../providers/todo/todo';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExpenditurePage } from '../expenditure/expenditure';
import { ExpenditureProvider } from '../../providers/expenditure/expenditure';
import * as Chart from 'chart.js';


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
  haveExpenditures: Boolean = false;
  expenditureObservable: any;
  pieChart: any;
  totalExpenditure: number = 0;
  pieData: Number[] = [];
  pielables: String[] = [];
  canvas: any;
  ctx: any;
  totalDebt: number = 0;
  totalCredit: number = 0;
  haveDebts: Boolean = false;
  debtObservable: any;

  constructor(
    public navCtrl: NavController,
    public ref: ChangeDetectorRef,
    public weatherProvider: WeatherProvider,
    public loadingCtrl: LoadingController,
    public firebaseProvider: FirebaseProvider,
    public todoProvider: TodoProvider,
    public afAuth: AngularFireAuth,
    public expenditureProvider: ExpenditureProvider    
  ) {
    this.user = FirebaseProvider.user;
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

    this.userName = this.user.displayName.split(' ')[0];
    this.photoURL = this.user.photoURL;
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }

    // get todos
    this.todoObservable = this.todoProvider.getTodos().subscribe(data => {
      console.log(data);
      this.todoCount = data.length;
      if (data.length !== 0) {
        this.firstTodo = data[0].heading;
      } else {
        this.firstTodo = '--';
      }
      this.gotTodoData = true;
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    });

    //get expenditures
    this.expenditureObservable = this.expenditureProvider.getExpenditures().subscribe(data => {
      this.totalExpenditure = 0;
      this.pielables = [];
      this.pieData = [];
      
      if (data.length === 0) {
        this.haveExpenditures = false;
      } else {
        this.haveExpenditures = true;
      }

      if (this.haveExpenditures) {
        let pieObject: Object = {};

    
        for (let ii = 0; ii < data.length; ii++) {
          if (!pieObject[`${data[ii].category}`]) {
            pieObject[`${data[ii].category}`] = 0;
          }
    
          pieObject[`${data[ii].category}`] += Number(data[ii].amount); 
          this.totalExpenditure += Number(data[ii].amount);
        }

        if (!this.ref['destroyed']) {
          this.ref.detectChanges();
        }
            
        for (let category in pieObject) {
          if (pieObject.hasOwnProperty(category)) {
            this.pielables.push(`${ category } - \u20B9 ${ pieObject[category] }`);
            this.pieData.push(pieObject[category]);
          }
        }
        this.drawChart();
      }
    });

    //get Debts
    this.debtObservable = this.expenditureProvider.getDebts().subscribe(data => {
      this.totalDebt = 0;
      this.totalCredit = 0;

      for(let ii = 0; ii < data.length ; ii++) {
        if (data[ii].type === 'Debt') {
          this.totalDebt += Number(data[ii].amount);
        } else {
          this.totalCredit += Number(data[ii].amount);
        }
      }

      this.haveDebts = true;
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }); 



    //get quote
    this.weatherProvider.getQuote().subscribe(
      data => {
        this.showContent = true;
        this.quote = data.contents.quotes[0].quote;
        this.author = data.contents.quotes[0].author;
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

  drawChart() {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.pielables,
          datasets: [{
              label: '# of Votes',
              data: this.pieData,
              backgroundColor: [
                '#3498db',
                '#2ecc71',
                '#e67e22',
                '#1abc9c',
                '#e74c3c',
                '#34495e',
                '#f1c40f',
                '#7f8c8d',
                '#c0392b',
                '#16a085',
                '#2c3e50',
                '#8e44ad',
                '#d35400',
                '#333',
                '#d35400',
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          position: 'bottom',
          fullWidth: true,
          labels: {
            fontSize: 14,
            padding: 15,
          }
        }
      }
    });
  }

  settingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  todoPage() {
    this.navCtrl.push(TodoPage);
  }

  expensesPage() {
    this.navCtrl.push(ExpenditurePage);
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

  debtsPage() {
    this.navCtrl.push(DebtsPage);
  }

  ionViewWillUnload() {
    if (this.todoObservable) {
      this.todoObservable.unsubscribe();
    }
    if (this.expenditureObservable) {
      this.expenditureObservable.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.ref.detach();
  }

}
