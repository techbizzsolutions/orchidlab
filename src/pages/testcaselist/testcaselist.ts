import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController, ItemSliding } from 'ionic-angular';
import { TestcasePage } from '../testcase/testcase';

@IonicPage()
@Component({
  selector: 'page-testcaselist',
  templateUrl: 'testcaselist.html',
})
export class TestcaselistPage {
  testlist=[];
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestcaselistPage');
    this.testlist = (JSON.parse(localStorage.getItem('TestCaes')))?JSON.parse(localStorage.getItem('TestCaes')):[];
    if(!this.testlist.length)
    {
      this.testlist=[{"action":"new","rate":"0","testname":"Haemoglobin/Indices"},{"action":"new","rate":"0","testname":"Hb"},{"action":"new","rate":"0","testname":"BT/CT"},{"action":"new","rate":"0","testname":"Sugar F/PP/R"},{"action":"new","rate":"0","testname":"Urea"},{"action":"new","rate":"0","testname":"Creatine"},{"action":"new","rate":"0","testname":"Cholesterol"},{"action":"new","rate":"0","testname":"HDL"},{"action":"new","rate":"0","testname":"LDL Cholesterol"},{"action":"new","rate":"0","testname":"Triglycerides"},{"action":"new","rate":"0","testname":"Urine Routine"},{"action":"new","rate":"0","testname":"Stool Routine/Occ. Bld"},{"action":"new","rate":"0","testname":"Semen Routine"},{"action":"new","rate":"0","testname":"HIV"},{"action":"new","rate":"0","testname":"HIV DUO (P24 + AB)"},{"action":"new","rate":"0","testname":"Widal"},{"action":"new","rate":"0","testname":"T3"},{"action":"new","rate":"0","testname":"T4"},{"action":"new","rate":"0","testname":"TSH(Ultrasensative)"},{"action":"new","rate":"0","testname":"Free T3"},{"action":"new","rate":"0","testname":"Free T4"},{"action":"new","rate":"0","testname":"F S H"},{"action":"new","rate":"0","testname":"L H"},{"action":"new","rate":"0","testname":"Prolactin"},{"action":"new","rate":"0","testname":"H C G(Beta)"},{"action":"new","rate":"0","testname":"Progesteron"},{"action":"new","rate":"0","testname":"Testosterone"},{"action":"new","rate":"0","testname":"Toxo IgG/IgM"},{"action":"new","rate":"0","testname":"TORCH IgG/IgM"},{"action":"new","rate":"0","testname":"Pro Time /APTT"},{"action":"new","rate":"0","testname":"Platelet Count"},{"action":"new","rate":"0","testname":"Billirubin (T&D)"},{"action":"new","rate":"0","testname":"S.G.P.T."},{"action":"new","rate":"0","testname":"S.G.O.T"},{"action":"new","rate":"0","testname":"Alkaline Phos."},{"action":"new","rate":"0","testname":"Proteins (T & Alb)"},{"action":"new","rate":"0","testname":"Amylase"},{"action":"new","rate":"0","testname":"Acid Phos (T&Prost.)"},{"action":"new","rate":"0","testname":"Sputam Routine"},{"action":"new","rate":"0","testname":"VMA (24 hrs Urine)"},{"action":"new","rate":"0","testname":"24 hours Urine Protein"},{"action":"new","rate":"0","testname":"RA Test"},{"action":"new","rate":"0","testname":"Bracella"},{"action":"new","rate":"0","testname":"VDRL"},{"action":"new","rate":"0","testname":"CPK- MB (Mass)"},{"action":"new","rate":"0","testname":"Troponin T (Quantitative)"},{"action":"new","rate":"0","testname":"Myoglobulin"},{"action":"new","rate":"0","testname":"Troponin / (Quantitative)"},{"action":"new","rate":"0","testname":"Homocysteine"},{"action":"new","rate":"0","testname":"HBA1C"},{"action":"new","rate":"0","testname":"CEA"},{"action":"new","rate":"0","testname":"AFP"},{"action":"new","rate":"0","testname":"CA 19-9"},{"action":"new","rate":"0","testname":"CA 125"},{"action":"new","rate":"0","testname":"HCG (Beta)"},{"action":"new","rate":"0","testname":"PSA"},{"action":"new","rate":"0","testname":"Malarial Parasites"},{"action":"new","rate":"0","testname":"Blood Group"},{"action":"new","rate":"0","testname":"LE Cell/ANA"},{"action":"new","rate":"0","testname":"Uric Acid"},{"action":"new","rate":"0","testname":"Sodium, Pottassium"},{"action":"new","rate":"0","testname":"LDH"},{"action":"new","rate":"0","testname":"Ammonia"},{"action":"new","rate":"0","testname":"C.P.K"},{"action":"new","rate":"0","testname":"C.P.K-MB"},{"action":"new","rate":"0","testname":"Calcium"},{"action":"new","rate":"0","testname":"Phosphorous"},{"action":"new","rate":"0","testname":"Fluid Routine CSF/Ascitic/Pleural"},{"action":"new","rate":"0","testname":"Pregnancy Test"},{"action":"new","rate":"0","testname":"ASo/CRP"},{"action":"new","rate":"0","testname":"Tuberculin Test (T.T.)"},{"action":"new","rate":"0","testname":"HBsAg"},{"action":"new","rate":"0","testname":"HbeAg / Anti Hbe"},{"action":"new","rate":"0","testname":"Anti HCV"},{"action":"new","rate":"0","testname":"TB-ELISA IgG/IgM/IgA"},{"action":"new","rate":"0","testname":"Dengue IgG/IgM"},{"action":"new","rate":"0","testname":"Leptospira igM"},{"action":"new","rate":"0","testname":"Others"}];
      localStorage.setItem('TestCaes', JSON.stringify(this.testlist));
    }
  }

  edit(item:any,slidingItem: ItemSliding)
  {
     console.log('item ',item.type);
     slidingItem.close();
     this.presentDatePopover(item);
  }

  delete(item:any,slidingItem: ItemSliding)
  {
      let confirmAlert = this.alertCtrl.create({
      subTitle: "Do you want to delete testcase?",
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
            var removeIndex = this.testlist.map(function(item) { return item.testname; }).indexOf(item.testname);
            // remove object
            this.testlist.splice(removeIndex, 1);
            localStorage.setItem('TestCaes', JSON.stringify(this.testlist));
            slidingItem.close();
          }
        }
      ]
    });
    confirmAlert.present();
  }

  presentDatePopover(item) {
    let myModal = this.modalCtrl.create(TestcasePage,item);
    myModal.onDidDismiss((data) => {
      if (data) {
        console.log(data);
        if(data.testcase.action === "edit")
        {
           for (let index = 0; index <  this.testlist.length; index++) {
              if(data.testcase.testname == this.testlist[index].testname)
              {
                this.testlist[index].testname = data.testcase.testname;
                this.testlist[index].rate = data.testcase.rate;
                localStorage.setItem('TestCaes', JSON.stringify(this.testlist));
                break;
              }
           }
        }
        else{
          for (let index = 0; index < this.testlist.length; index++) {
            if(this.testlist[index].testname == data.testcase.testname)
            {
              let toast = this.toastCtrl.create({
                message: 'This Test Case already exits, please enter different Test Case',
                position: 'top',
                duration: 3000
              });
              toast.present();
               return;
            }
            
          }
          this.testlist.push(data.testcase);
          localStorage.setItem('TestCaes', JSON.stringify(this.testlist));
          
        }
      }
    });
    myModal.present();
  }
}
