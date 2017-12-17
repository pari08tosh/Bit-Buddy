import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddExpenditurePage } from '../add-expenditure/add-expenditure';
import { EditExpenditurePage } from '../edit-expenditure/edit-expenditure';
import { DebtsPage } from '../debts/debts';
import { ExpenditureProvider } from '../../providers/expenditure/expenditure';
import { Expenditure } from '../../models/models';

@Component({
  selector: 'page-expenditure',
  templateUrl: 'expenditure.html',
})
export class ExpenditurePage {
  
  canvas: any;
  ctx: any;
  expenditureObservable: any;
  expenditureList: Expenditure[] = [];
  haveData: Boolean = false;
  waitingForData: Boolean = true;
  pieChart: any;
  totalExpenditure: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private expenditureProvider: ExpenditureProvider,
    public ref: ChangeDetectorRef,    
  ) {
  }

  ionViewDidLoad() {
    this.expenditureObservable = this.expenditureProvider.getExpenditures().subscribe(data => {
      this.expenditureList = data;
      this.totalExpenditure = 0;

      if (this.expenditureList.length === 0) {
        this.haveData = false;
      } else {
        this.haveData = true;
      }

      for (let ii = 0; ii < this.expenditureList.length; ii++) {
        this.totalExpenditure += Number(this.expenditureList[ii].amount);
      }

      this.waitingForData = false;
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    });
  }

  addExpenditure() {
    this.navCtrl.push(AddExpenditurePage);
  }

  editExpenditure(expenditure) {
    this.navCtrl.push(EditExpenditurePage, expenditure);
  }

  gotoDebts() {
    this.navCtrl.push(DebtsPage);
  }

  ionViewWillUnload() {
    if (this.expenditureObservable) {
      this.expenditureObservable.unsubscribe();
    }
  }

}
