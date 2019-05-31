import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestcaselistPage } from './testcaselist';

@NgModule({
  declarations: [
    TestcaselistPage,
  ],
  imports: [
    IonicPageModule.forChild(TestcaselistPage),
  ],
})
export class TestcaselistPageModule {}
