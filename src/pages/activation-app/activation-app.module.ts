import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivationAppPage } from './activation-app';

@NgModule({
  declarations: [
    ActivationAppPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivationAppPage),
  ],
})
export class ActivationAppPageModule {}
