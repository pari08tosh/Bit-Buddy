import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@Component({
  selector: 'page-write-todo',
  templateUrl: 'write-todo.html',
})
export class WriteTodoPage {

  user: any;

  heading: String = '';
  description: String = '';
  deadline: String = '';


  constructor(
    public navCtrl: NavController,
    public alertProvider: AlertProvider,
    public firebaseProvider: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    this.deadline = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  }

  addTodo()
  {
    this.firebaseProvider.addTodo({
      heading: this.heading,
      description: this.description,
      deadline: this.deadline.slice(0, -1),
    });
    this.alertProvider.alert('New Task Added', 1500);
    this.navCtrl.pop();
  }
}
