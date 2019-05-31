import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillDetailPage } from './bill-detail';

@NgModule({
  declarations: [
    BillDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BillDetailPage),
  ],
})
export class BillDetailPageModule {}
