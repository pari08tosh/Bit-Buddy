import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { Expenditure, Debt } from '../../models/models';
import { AngularFireAuth } from 'angularfire2/auth';
import { DebtsPage } from '../../pages/debts/debts';
import { FirebaseProvider } from '../firebase/firebase';
import 'rxjs/add/operator/map';
import { FirebaseAppProvider } from 'angularfire2';

@Injectable()
export class ExpenditureProvider {

  user: any;
  expenditureCollection: AngularFirestoreCollection<Expenditure>;
  debtCollection:  AngularFirestoreCollection<Debt>;


  constructor( 
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.user = FirebaseProvider.user;
    this.expenditureCollection = this.db.collection<Expenditure>(`users/${ this.user.uid }/expenditures`);
    this.debtCollection = this.db.collection<Debt>(`users/${ this.user.uid }/debts`) 
  }

  getExpenditures() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth());
    let thisMonth = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);
    return this.db.collection<Expenditure>(`users/${ this.user.uid }/expenditures`, ref => ref.where('date', '>=', thisMonth).orderBy('date', 'desc')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Expenditure;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getDebts() {
    return this.db.collection<Debt>(`users/${ this.user.uid }/debts`, ref => ref.orderBy('date')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Debt;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  addDebt(data) {
    this.debtCollection.add(data);
  }

  deleteDebt(id) {
    this.debtCollection.doc(id).delete();
  }

  editDebt(id, data) {
    this.debtCollection.doc(id).update(data);
  }

  addExpenditure(data) {
    this.expenditureCollection.add(data);
  }

  deleteExpenditure(id) {
    this.expenditureCollection.doc(id).delete();
  }

  editExpenditure(id, data) {
    this.expenditureCollection.doc(id).update(data);
  }
}
