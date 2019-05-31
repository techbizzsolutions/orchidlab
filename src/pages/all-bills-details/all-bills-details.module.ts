import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllBillsDetailsPage } from './all-bills-details';

@NgModule({
  declarations: [
    AllBillsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllBillsDetailsPage),
  ],
})
export class AllBillsDetailsPageModule {}
