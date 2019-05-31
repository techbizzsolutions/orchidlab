import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { FilterPage } from '../filter/filter';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-previous-bill',
  templateUrl: 'user-previous-bill.html',
})
export class UserPreviousBillPage {
  weight:number = 0 ;
  saleAmount:number = 0;
  saleWeight:number = 0;
  modeamount:number = 0;
  totalModeWeight:number = 0;
  bill=[];
  Bills = [];
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dateTimeProvider:DateTimeProvider,
    public navParams: NavParams) {
      this.Bills = JSON.parse(localStorage.getItem('Bills'));

  }

  refresh()
  {
    this.Bills = JSON.parse(localStorage.getItem('Bills'));
    this.ionViewDidLoad();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddUserPage');
    if(this.Bills)
    {
      this.bill = this.Bills;
      this.saleAmount = 0;
      this.saleWeight = 0;
      this.modeamount = 0;
      this.totalModeWeight = 0;
      this.bill.forEach(element => {
        this.saleAmount = this.saleAmount + Number(element.saleamount);
        this.saleWeight = this.saleWeight + Number(element.totalSaleWeight);
        this.modeamount = this.modeamount + Number(element.totalModemamount);
        this.totalModeWeight = this.totalModeWeight + Number(element.totalModeWeight);
      });
    }
  }

  edit(item:any,slidingItem: ItemSliding)
  {
     console.log('item ',item.type);
     slidingItem.close();
     if(item.type === 'Stone' || item.type === 'Kale Money Less')
     {
      this.navCtrl.push('AdvanceBillPage',item);
     }
     else{
      this.navCtrl.push('NormalBillPage',item);
     }
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
              var removeIndex = this.bill.map(function(item) { return item.Bill; }).indexOf(item.Bill);
              // remove object
              this.bill.splice(removeIndex, 1);
              localStorage.setItem('Bills', JSON.stringify(this.bill));
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
    let myModal = this.modalCtrl.create(FilterPage);
    myModal.onDidDismiss((data) => {
      if (data) {
        console.log(data);
        if(this.Bills)
        {
          this.bill = [];
          this.saleAmount = 0;
          this.saleWeight = 0;
          this.modeamount = 0;
          this.totalModeWeight = 0;
          for (let index = 0; index < this.Bills.length; index++) {
            if(this.Bills[index].Mobile == data.value.Mobile || this.Bills[index].date == data.value.date || this.Bills[index].Name == data.value.Name)
            {
                this.bill.push(this.Bills[index]);
                this.saleAmount = this.saleAmount + Number(this.Bills[index].saleamount);
                this.saleWeight = this.saleWeight + Number(this.Bills[index].totalSaleWeight);
                this.modeamount = this.modeamount + Number(this.Bills[index].totalModemamount);
                this.totalModeWeight = this.totalModeWeight + Number(this.Bills[index].totalModeWeight);
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
