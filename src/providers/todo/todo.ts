import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../../models/models';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoProvider {

  user: any;
  todoCollection: AngularFirestoreCollection<Todo>;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth    
  ) {
    afAuth.authState.subscribe(user => {
      this.user = user;
      if (user) {
        this.todoCollection = this.db.collection<Todo>(`users/${ this.user.uid }/todos`);
      }
    });
  }

  getTodos() {
    console.log('fetching todos');
    return this.db.collection<Todo>(`users/${ this.user.uid }/todos`, ref => ref.orderBy("deadline")).snapshotChanges().map(actions => {
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

}
