import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenditureProvider } from '../../providers/expenditure/expenditure';
import { Debt } from '../../models/models';

@Component({
  selector: 'page-edit-debt',
  templateUrl: 'edit-debt.html',
})
export class EditDebtPage {

  transaction: Debt = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public expenditureProvider: ExpenditureProvider
  ) {
  }

  ionViewDidLoad() {
    this.transaction.amount = this.navParams.get('amount');
    this.transaction.date = this.navParams.get('date');
    this.transaction.description = this.navParams.get('description');
    this.transaction.name = this.navParams.get('name');
    this.transaction.type = this.navParams.get('type');
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }

  editDebt() {
    let data = {
      amount: this.transaction.amount,
      date: this.transaction.date,
      description: this.transaction.description,
      name: this.transaction.name,
      type: this.transaction.type
    }
    this.expenditureProvider.editDebt(this.navParams.get('id'), data);
    this.navCtrl.pop();
  }

}
