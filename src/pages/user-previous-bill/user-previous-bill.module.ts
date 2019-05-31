import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPreviousBillPage } from './user-previous-bill';

@NgModule({
  declarations: [
    UserPreviousBillPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPreviousBillPage),
  ],
})
export class UserPreviousBillPageModule {}
