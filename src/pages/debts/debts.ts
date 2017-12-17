import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddDebtPage } from '../add-debt/add-debt';
import { EditDebtPage } from '../edit-debt/edit-debt';
import { ExpenditureProvider } from '../../providers/expenditure/expenditure';
import { Debt } from '../../models/models';

@Component({
  selector: 'page-debts',
  templateUrl: 'debts.html',
})
export class DebtsPage {

  segment: String = 'debt';
  debtList: Debt[] = [];
  creditList: Debt[] = [];
  viewList: Debt[] = [];
  debtObservable: any;
  waitingForData: Boolean = true;
  haveData: Boolean = false;
  debtView: Boolean = true;
  totalDebt: number = 0;
  totalCredit: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public expenditureProvider: ExpenditureProvider
  ) {

  }

  ionViewDidLoad() {
    this.waitingForData = true;
    this.debtObservable = this.expenditureProvider.getDebts().subscribe(data => {
      this.totalCredit = 0;
      this.totalDebt = 0;
      this.debtList = [];
      this.creditList = [];

      for(let ii = 0; ii < data.length ; ii++) {
        if (data[ii].type === 'Debt') {
          this.totalDebt += Number(data[ii].amount);
          this.debtList.push(data[ii]);
        } else {
          this.totalCredit += Number(data[ii].amount);
          this.creditList.push(data[ii]);
        }
      }

      this.segment = 'debt';
      
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
      this.segmentChanged({_value: 'debt'});
    });
  }

  swipe(event) {
    if (event.direction == '2') {
      if (this.segment === 'debt') {
        this.segment = 'credit'
        return this.segmentChanged({ _value: this.segment});
      } else {
        return false;
      }
    }
    if (event.direction == '4') {
      if (this.segment === 'credit') {
        this.segment = 'debt';
        return this.segmentChanged({ _value: this.segment});
      } else {
        return false;
      }
    }
  };

  segmentChanged(event) {
    this.waitingForData = true;
    
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }

    if (event._value === 'debt') {

      console.log(this.debtList.length);
      
      if (this.debtList.length === 0) {
        this.haveData = false;
      } else {
        this.haveData = true;
      }

      this.viewList = this.debtList;
      this.debtView = true;
    } else {
      if (this.creditList.length === 0) {
        this.haveData = false;
      } else {
        this.haveData = true;
      }

      this.viewList = this.creditList;
      this.debtView = false;
    }

    this.waitingForData = false;
    console.log(this.haveData);

    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }

  addDebt() {
    this.navCtrl.push(AddDebtPage);
  }

  editDebt(debt) {
    this.navCtrl.push(EditDebtPage, debt);
  }

  deleteDebt(debt) {
    this.expenditureProvider.deleteDebt(debt.id);
  }

  ionViewWillUnload() {
    if (this.debtObservable) {
      this.debtObservable.unsubscribe();
    }
  }
}
