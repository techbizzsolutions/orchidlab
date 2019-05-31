import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectTestPage } from '../select-test/select-test';
import { DateTimeProvider } from '../../providers/date-time/date-time';
@IonicPage()
@Component({
  selector: 'page-patiententry',
  templateUrl: 'patiententry.html',
})
export class PatiententryPage {
  private register : FormGroup;
  Type:any;
  totalamount= 0;
  totalnetamount = 0;
  testCaselist=[];
  date:any = 'Select Date';
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dateTimeProvider:DateTimeProvider,
    public formBuilder: FormBuilder, public navParams: NavParams) {
    this.register = this.formBuilder.group({
      Invoice:['', Validators.required],
      Lab: ['', Validators.required],
      Patient:['', Validators.required],
      Age: ['', Validators.required],
      Dignosis:['', Validators.required],
      discount:[0],
      labourcharge:[0],
      Mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatiententryPage');
    if(this.navParams.data.Invoice)
    {
      this.register = this.formBuilder.group({
        Invoice:[this.navParams.data.Invoice, Validators.required],
        Lab: [this.navParams.data.Lab, Validators.required],
        Patient:[this.navParams.data.Patient, Validators.required],
        Age: [this.navParams.data.Age, Validators.required],
        Dignosis:[this.navParams.data.Dignosis, Validators.required],
        discount:[this.navParams.data.discount],
        labourcharge:[this.navParams.data.labourcharge],
        Mobile : [this.navParams.data.Mobile,Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
      this.testCaselist = this.navParams.data.testCaselist;
      this.date = this.navParams.data.date;
      this.totalamount = this.navParams.data.totalamount;
      this.totalnetamount = this.navParams.data.totalnetamount;

    }
  }
  
  cal()
  {
    this.totalnetamount = this.totalamount + Number(this.register.value.labourcharge) - Number(this.register.value.discount);
  }

  logForm()
  {
    if(this.date === "Select Date")
    {  
        let toast = this.toastCtrl.create({
        message: 'Please select Date',
        position: 'top',
        duration: 3000
      });
      toast.present();
       return;
    }
    if(!this.testCaselist.length)
    {  
        let toast = this.toastCtrl.create({
        message: 'Please add at least one Test case',
        position: 'top',
        duration: 3000
      });
      toast.present();
       return;
    }
    this.register.value.date = this.date;
    this.register.value.totalamount = this.totalamount;
    this.register.value.totalnetamount = this.totalnetamount;
    this.register.value.testCaselist = this.testCaselist;
    let Bills = JSON.parse(localStorage.getItem('Bills'));
    if(Bills)
    {
      if(this.navParams.data.Invoice)
      {
        var removeIndex = Bills.map(function(item) { return item.Invoice; }).indexOf(this.navParams.data.Invoice);
        // remove object
        Bills.splice(removeIndex, 1);
        Bills.push(this.register.value);
        localStorage.setItem('Bills', JSON.stringify(Bills));
      }
      else{
        for (let index = 0; index < Bills.length; index++) {
          if(Bills[index].Bill == this.register.value.Invoice)
          {
            let toast = this.toastCtrl.create({
              message: 'This invoice number already exits, please enter different invoice number',
              position: 'top',
              duration: 3000
            });
            toast.present();
             return;
          }
          
        }
        Bills.push(this.register.value);
        localStorage.setItem('Bills', JSON.stringify(Bills));
      }
      
    }
    else{
      let data = [];
      data.push(this.register.value);
      localStorage.setItem('Bills', JSON.stringify(data));
    }
    let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to print the bill?",
      buttons: [
        {
          text: 'NO',
          handler: () => {
            this.navCtrl.pop();
            return;
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.navCtrl.pop();
            this.navCtrl.push('BillDetailPage',this.register.value);
          }
        }
      ]
    });
    confirmAlert.present();

  }

  opencal()
  {
      this.dateTimeProvider.opencal().then(res =>{
          this.date =  res;
     })
     .catch(err=>{
      var date = new Date();
      var res =  date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
      this.date  =  res;
     });
  }

  delete(billitem)
  {
    console.log(billitem);
    let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to delete item?",
      buttons: [
        {
          text: 'NO',
          handler: () => {
            return;
          }
        },
        {
          text: 'YES',
          handler: () => {
            var removeIndex = this.testCaselist.map(function(item) { return item.id; }).indexOf(billitem.id);
            this.testCaselist.splice(removeIndex, 1);
            this.getTotalAmount();
          }
        }
      ]
    });
    confirmAlert.present();
    
  }

  getTotalAmount()
  {
    this.totalamount = 0;
    for (let index = 0; index < this.testCaselist.length; index++) {
      this.totalamount = this.totalamount + Number(this.testCaselist[index].Rate);
    }
    this.cal();
  }

  presentDatePopover(item) {
    let myModal = this.modalCtrl.create(SelectTestPage,item);
    myModal.onDidDismiss((data) => {
      if (data) {
        console.log(data.testcase);
        if(data.testcase.action === "edit")
        {
           for (let index = 0; index <  this.testCaselist.length; index++) {
              if(data.testcase.id == this.testCaselist[index].id)
              {
                this.testCaselist[index].testname = data.testcase.testname;
                this.testCaselist[index].Description = data.testcase.Description;
                this.testCaselist[index].Rate = data.testcase.Rate;
                break;
              }
           }
        }
        else{
          this.testCaselist.push(data.testcase);
        }
        this.getTotalAmount();
      }
    });
    myModal.present();
  }
}
