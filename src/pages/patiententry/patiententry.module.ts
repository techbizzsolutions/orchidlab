import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatiententryPage } from './patiententry';

@NgModule({
  declarations: [
    PatiententryPage,
  ],
  imports: [
    IonicPageModule.forChild(PatiententryPage),
  ],
})
export class PatiententryPageModule {}
