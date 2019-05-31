import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { AdvanceFilterPage } from '../advance-filter/advance-filter';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {
  Bills = [];
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dateTimeProvider:DateTimeProvider,
    public navParams: NavParams) {
  }

  print()
  {
    this.navCtrl.push('AllBillsDetailsPage',this.Bills);
  }
  refresh()
  {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {   
    this.Bills = JSON.parse(localStorage.getItem('Bills'));
    console.log(this.Bills);
  }

  edit(item:any,slidingItem: ItemSliding)
  {
     console.log('item ',item);
     slidingItem.close();
     this.navCtrl.push('PatiententryPage',item);
  }

  delete(item:any,slidingItem: ItemSliding)
  {
      let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to print the bill?",
      buttons: [
        {
          text: 'NO',
          handler: () => {
            slidingItem.close();
            return;
          }
        },
        {
          text: 'YES',
          handler: () => {
            // get index of object with id:37
              var removeIndex = this.Bills.map(function(item) { return item.Invoice; }).indexOf(item.Invoice);
              // remove object
              this.Bills.splice(removeIndex, 1);
              localStorage.setItem('Bills', JSON.stringify(this.Bills));
              this.refresh();
          }
        }
      ]
    });
    confirmAlert.present();
  }

  itemclick(item:any)
  {
    console.log('item ',item);
    this.navCtrl.push('BillDetailPage',item);
  }

  presentDatePopover() {
    let myModal = this.modalCtrl.create(AdvanceFilterPage);
    myModal.onDidDismiss((data) => {
      if (data) {
        console.log(data);
        if(this.Bills)
        {
          for (let index = 0; index < this.Bills.length; index++) {
            if(data.From === "From" && data.To === "To")
            {
                console.log('item 1');
            }
          }
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'Please add at least one bill',
            position: 'top',
            duration: 3000
          });
          toast.present();
        }
      }
    });
    myModal.present();
  }
}
