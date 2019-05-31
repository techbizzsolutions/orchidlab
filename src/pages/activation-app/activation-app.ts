import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-activation-app',
  templateUrl: 'activation-app.html',
})
export class ActivationAppPage {
  private register : FormGroup;

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder,public toastCtrl: ToastController, public navParams: NavParams) {
    this.register = this.formBuilder.group({
      Code: ['', Validators.required]
        });
  }

  logForm()
  {
    console.log('ActivationAppPage',this.register.value);
    if(this.register.value.Code === '9579553748')
    {
      let toast = this.toastCtrl.create({
        message: 'App is activated successfully',
        position: 'top',
        duration: 3000
      });
      toast.present();
      localStorage.setItem('activateapp', "true");
      this.navCtrl.setRoot(HomePage);
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Please Enter correct activation code',
        position: 'top',
        duration: 3000
      });
      toast.present();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivationAppPage');
  }

}
