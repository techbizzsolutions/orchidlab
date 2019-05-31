import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyInformationPage } from './company-information';

@NgModule({
  declarations: [
    CompanyInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyInformationPage),
  ],
})
export class CompanyInformationPageModule {}
