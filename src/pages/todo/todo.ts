import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WriteTodoPage } from '../write-todo/write-todo';
import { EditTodoPage } from '../edit-todo/edit-todo';
import { AlertProvider } from '../../providers/alert/alert';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage {

  todosRef: any;
  user: any;
  todos: any = [];
  todoObj: any;
  gotData: Boolean = false;
  todoFirebaseCallback: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertProvider: AlertProvider,
    public ref: ChangeDetectorRef,
  ) {
    this.gotData = false;
  }

  ionViewDidLoad() {
    console.log(`entered page`);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.todosRef = firebase.database().ref(`todos/${ this.user.uid }`);
        this.todoFirebaseCallback = this.todosRef.orderByChild('deadline').limitToFirst(20).on('value', data => {
          console.log(data);
          this.todos = [];
          data.forEach((todo) => {
            const todoObj = {
              key: todo.key,
              deadline: todo.val().deadline,
              heading: todo.val().heading,
              description: todo.val().description,
            }
            this.todos.push(todoObj);
          });
          this.gotData = true;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }
        });
      } else {
        this.user = null;
        this.todos = [];
      }
    });
  }

  deleteTodo(todo) {
    this.todosRef.child(todo.key).remove();
    this.alertProvider.alert('Good Job!', 1500);
  }

  editTodo(todo) {
    this.navCtrl.push(EditTodoPage, todo);
  }

  writeTodo() {
    this.navCtrl.push(WriteTodoPage);
  }

  ionViewWillUnload() {
    console.log(`todo exit`);
    this.todosRef.off('value', this.todoFirebaseCallback);
  }

}
