import { Component, ChangeDetectorRef, transition } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenditureProvider } from '../../providers/expenditure/expenditure';
import { Debt } from '../../models/models';

@Component({
  selector: 'page-add-debt',
  templateUrl: 'add-debt.html',
})
export class AddDebtPage {

  transaction: Debt = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public expenditureProvider: ExpenditureProvider
  ) {
  }

  ionViewDidLoad() {
   this.transaction.type = 'Debt';
   let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
   this.transaction.date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
   if (!this.ref['destroyed']) {
     this.ref.detectChanges();
   }
  }

  addDebt() {
    this.expenditureProvider.addDebt(this.transaction);
    this.navCtrl.pop();
  }

  ngOnDestroy() {
    this.ref.detach();
  }

}
