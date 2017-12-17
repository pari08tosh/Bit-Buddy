import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Expenditure } from '../../models/models';
import { ExpenditureProvider } from '../../providers/expenditure/expenditure';


@Component({
  selector: 'page-edit-expenditure',
  templateUrl: 'edit-expenditure.html',
})
export class EditExpenditurePage {

  expenditure: Expenditure = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public expenditureProvider: ExpenditureProvider
  ) {
  }

  ionViewDidLoad() {
    this.expenditure.category = this.navParams.get('category');
    this.expenditure.description = this.navParams.get('description')
    this.expenditure.modeOfPayment = this.navParams.get('modeOfPayment');
    this.expenditure.amount = this.navParams.get('amount');
    this.expenditure.date = this.navParams.get('date');
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }

  editExpenditure() {
    let data = {
      category: this.expenditure.category,
      amount: this.expenditure.amount,
      description: this.expenditure.description,
      date: this.expenditure.date,
      modeOfPayment: this.expenditure.modeOfPayment
    }
    console.log(data);

    this.expenditureProvider.editExpenditure(this.navParams.get('id'), data);
    this.navCtrl.pop();
  }

  deleteExpenditure() {
    this.expenditureProvider.deleteExpenditure(this.navParams.get('id'));
    this.navCtrl.pop();
  }



}
