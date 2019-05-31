import { Component } from '@angular/core';
import { NavController,ViewController, NavParams, ToastController, ModalController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeProvider } from '../../providers/date-time/date-time';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  private register : FormGroup;
  From:any;
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public dateTimeProvider:DateTimeProvider,
    public formBuilder: FormBuilder,public navParams: NavParams) {
    this.register = this.formBuilder.group({
      Name:[''],
      Mobile : ['',Validators.compose([Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddUserPage');
  }

  close()
  {
    this.viewCtrl.dismiss();
  }
  opencal()
  {
      this.dateTimeProvider.opencal().then(res =>{
          this.From =  res;
     })
     .catch(err=>{
      var date = new Date();
      var res =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
      this.From =  res;
     });
  }

  logForm()
  {
    console.log('ionViewDidLoad AdminAddUserPage',this.register.value);
    if(!this.register.value.Name && !this.register.value.Mobile && !this.From)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select at least one filter',
        position: 'top',
        duration: 3000
      });
      toast.present();
    }
    else{
      this.register.value.date = (this.From)?this.From:"";
      this.viewCtrl.dismiss({ value: this.register.value});
    }
  }

}
