import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AlertProvider } from '../../providers/alert/alert';

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
    public navParams: NavParams,
    public alertProvider: AlertProvider,
  ) {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }

  ionViewDidLoad() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    this.deadline = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  }

  addTodo()
  {
    firebase.database().ref(`/todos/${ this.user.uid }`).push({
      uid: this.user.uid,
      heading: this.heading,
      description: this.description,
      deadline: this.deadline.slice(0, -1),
    });
    this.alertProvider.alert('New Task Added', 1500);
    this.navCtrl.pop();
  }
}
