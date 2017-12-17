import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { TodoProvider } from '../../providers/todo/todo';


@Component({
  selector: 'page-write-todo',
  templateUrl: 'write-todo.html',
})
export class WriteTodoPage {

  heading: String = '';
  description: String = '';
  deadline: String = '';


  constructor(
    public navCtrl: NavController,
    public alertProvider: AlertProvider,
    public todoProvider: TodoProvider,
    public ref: ChangeDetectorRef
  ) {
  }

  ionViewDidLoad() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    this.deadline = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }

  addTodo() {
    if (!this.heading) {
      this.alertProvider.alert('HEADING IS REQUIRED', 2000);
      return false;
    }
    this.todoProvider.addTodo({
      heading: this.heading,
      description: this.description,
      deadline: this.deadline.slice(0, -1),
    });
    this.alertProvider.alert('New Task Added', 1500);
    this.navCtrl.pop();
  }

  ngOnDestroy() {
    this.ref.detach();
  }
}
