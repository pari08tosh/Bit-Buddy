import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TodoPage } from '../../pages/todo/todo';
import * as firebase from 'firebase/app';

@Injectable()
export class NotificationProvider {

  todosRef: any;
  interval: any;
  enabled: Boolean = false;

  constructor(
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications,
  ) {
    this.backgroundMode.setDefaults({ silent: true })
  }

  enableNotifications() {
    if (this.enabled) {
      console.log(`noti alredy enabled`);
      return;
    }
    this.enabled = true;
    this.backgroundMode.setDefaults({ silent: true })
    this.backgroundMode.enable();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.todosRef = firebase.database().ref(`todos/${ user.uid }`);
        this.interval = setInterval(() => {
          if (this.backgroundMode.isActive() ) {
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let currentDate = new Date(Date.now() - tzoffset)
            let maxDate = new Date(Date.now() - tzoffset + 1000*60*60*24);
            this.todosRef.orderByChild('deadline').limitToFirst(10).once('value').then((data) => {
              data.forEach(todo => {
                let todoDate = new Date(Date.parse(todo.val().deadline) - tzoffset);
                if (todoDate >= currentDate && todoDate <= maxDate ) {
                  this.localNotifications.schedule({
                    id: 1,
                    title: 'Pending Todos',
                    text: 'You have some tasks to complete today!',
                  });
                }

                if (todoDate < currentDate ) {
                  this.localNotifications.schedule({
                    id: 10,
                    title: 'Alert! Overdue Todos',
                    text: 'You have crossed the deadline for some tasks. Complete them soon',
                  });
                }
              });
            });
          }
        }, 3600000);
      } else {
        console.log(`Erorr generating notifications`)
      }
    });
  };

  disableNotifications() {
    this.backgroundMode.disable();
    clearInterval(this.interval);
    this.localNotifications.clearAll();
    this.enabled = false;
  }
}
