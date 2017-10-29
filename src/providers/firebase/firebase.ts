import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../../models/models';

@Injectable()

export class FirebaseProvider {

  user: any;
  todoList: Observable<Todo[]>;
  todoCollection: AngularFirestoreCollection<Todo>;

  constructor(
    public http: Http,
    public db: AngularFirestore,
  ) {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      console.log(this.user);
      if (user) {
        this.todoCollection = db.collection<Todo>(`todos/${ user.uid }/user-todos`);
      }
    });

  }

  getTodos() {
    return this.db.collection<Todo>(`todos/${ this.user.uid }/user-todos`, ref => ref.orderBy("deadline")).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  addTodo(data) {
    this.todoCollection.add(data);
  }

  deleteTodo(todo) {
    this.todoCollection.doc(todo.id).delete();
  }

  editTodo(id, data) {
    this.todoCollection.doc(id).update(data);
  }

  loggedIn() {
    console.log('colled me')
    return this.user;
  }

}
