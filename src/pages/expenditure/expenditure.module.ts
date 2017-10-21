import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenditurePage } from './expenditure';

@NgModule({
  declarations: [
    ExpenditurePage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenditurePage),
  ],
})
export class ExpenditurePageModule {}
