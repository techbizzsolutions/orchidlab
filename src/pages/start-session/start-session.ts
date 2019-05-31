import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-start-session',
  templateUrl: 'start-session.html',
})
export class StartSessionPage {
  members=[];
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  initializeItems() {
    this.members = (localStorage.getItem('members'))?JSON.parse(localStorage.getItem('members')):[];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.members = this.members.filter((item) => {
        return (item.Mobile.indexOf(val) > -1);
      })
    }
  }

  session(item,index)
  {
    console.log(item,'ionViewDidLoad StartSessionPage',index);
    let date = new Date();
    date.setDate(date.getDate());
    let From7 = date.toISOString().slice(0, 10);
    this.members[index].session = From7;
    localStorage.setItem('members', JSON.stringify( this.members));
    let toast = this.toastCtrl.create({
      message: 'Session has been started successfully',
      position: 'top',
      duration: 3000
    });
    toast.present();
  }
}
