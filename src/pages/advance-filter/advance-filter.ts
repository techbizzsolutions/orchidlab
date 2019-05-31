import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DateTimeProvider } from '../../providers/date-time/date-time';

@Component({
  selector: 'page-advance-filter',
  templateUrl: 'advance-filter.html',
})
export class AdvanceFilterPage {
  From:any = 'From';
  To:any = 'To';
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    public dateTimeProvider:DateTimeProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

  opencal(type)
  {
      this.dateTimeProvider.opencal().then(res =>{
        if(type == 'From')
        {
          this.From =  res;
        }
        else{
            this.To =  res;
          }
        
     })
     .catch(err=>{
      var date = new Date();
      var res =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
      if(type == 'From')
      {
        this.From =  res;
      }
      else{
          this.To =  res;
        }
     });
  }

  close()
  {
    this.viewCtrl.dismiss();
  }

  view()
  {
    if(this.From == 'From' && this.To == 'To')
    {
      let toast = this.toastCtrl.create({
        message: 'Please select at least one filter',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    else{
      if(this.From != 'From' && this.To == 'To')
      {
        let toast = this.toastCtrl.create({
          message: 'Please select To date range',
          position: 'top',
          duration: 3000
        });
        toast.present();
        return;
      }
      if(this.To != 'To' && this.From == 'From')
      {
        let toast = this.toastCtrl.create({
          message: 'Please select From date range',
          position: 'top',
          duration: 3000
        });
        toast.present();
        return;
      }
      this.viewCtrl.dismiss({ From: this.From, To: this.To});
    }
  }
}
