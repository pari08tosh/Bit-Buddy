import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenditureProvider } from '../../providers/expenditure/expenditure';
import { Expenditure } from '../../models/models';


@Component({
  selector: 'page-add-expenditure',
  templateUrl: 'add-expenditure.html',
})
export class AddExpenditurePage {
  
  expenditure: Expenditure = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public expenditureProvider: ExpenditureProvider
  ) {
  }

  ionViewDidLoad() {
    this.expenditure.category = "Food";
    this.expenditure.modeOfPayment = "Cash";
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    this.expenditure.date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }


  addExpenditure() {
    this.expenditureProvider.addExpenditure(this.expenditure);
    this.navCtrl.pop();
  }

  ngOnDestroy() {
    this.ref.detach();
  }
}
