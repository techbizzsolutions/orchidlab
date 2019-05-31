import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-company-information',
  templateUrl: 'company-information.html',
})
export class CompanyInformationPage {
  private register : FormGroup;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder, public navParams: NavParams) {
    let companyinfo = JSON.parse(localStorage.getItem('companyinfo'));
    if(companyinfo)
    {
      this.register = this.formBuilder.group({
        Name:[companyinfo.Name, Validators.required],
        Address:[companyinfo.Address, Validators.required],
        Proprietor:[companyinfo.Proprietor, Validators.required],
        TelOne: [companyinfo.TelOne, Validators.required],
        TelTwo: [companyinfo.TelTwo],
        Website: [companyinfo.Website],
        Establish: [companyinfo.Establish],
        Term: [companyinfo.Term],
        Email: [companyinfo.Email, Validators.compose([
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ])],
        MobileOne : [companyinfo.MobileOne,Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])],
        MobileTwo : [companyinfo.MobileTwo,Validators.compose([Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
    }
    else{
      this.register = this.formBuilder.group({
        Name:['', Validators.required],
        Address:['', Validators.required],
        Proprietor:['', Validators.required],
        TelOne: ['', Validators.required],
        TelTwo: [''],
        Website: [''],
        Term: [''],
        Establish: [''],
        Email: ["", Validators.compose([
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ])],
        MobileOne : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])],
        MobileTwo : ['',Validators.compose([Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
    }
    
  }

  logForm()
  {
    localStorage.setItem('companyinfo', JSON.stringify(this.register.value));
    let toast = this.toastCtrl.create({
      message: 'Company information has been added successfully',
      position: 'top',
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot('AdminHomePage');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInformationPage');
  }

}
