import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@Component({
  selector: 'page-edit-todo',
  templateUrl: 'edit-todo.html',
})
export class EditTodoPage {

  heading: String = '';
  description: String = '';
  deadline: String = '';
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertProvider: AlertProvider,
    public firebaseProvider: FirebaseProvider,
  ) {
  }

  ionViewDidLoad() {
    this.heading = this.navParams.get('heading');
    this.description = this.navParams.get('description');
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.deadline = new Date(Date.parse(this.navParams.get('deadline')) - tzoffset).toISOString();
  }

  editTodo() {
    this.firebaseProvider.editTodo(this.navParams.get('id'),{
      heading: this.heading,
      description: this.description,
      deadline: this.deadline.slice(0, -1),
    });
    this.alertProvider.alert('Todo Updated', 1500);
    this.navCtrl.pop();
  }

}
