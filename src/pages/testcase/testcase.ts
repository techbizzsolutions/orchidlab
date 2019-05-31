import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'page-testcase',
  templateUrl: 'testcase.html',
})
export class TestcasePage {
  private register : FormGroup;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private viewCtrl: ViewController, public navParams: NavParams) {
      this.register = this.formBuilder.group({
        testname:['', Validators.required],
        rate: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestcasePage');
    if(this.navParams.data.testname)
    {
      this.register = this.formBuilder.group({
        testname:[this.navParams.data.testname, Validators.required],
        rate: [this.navParams.data.rate, Validators.required],
      });
    }
  }
  
  logForm()
  {
    if(this.navParams.data.testname)
    {
      this.register.value.action = 'edit';
      this.viewCtrl.dismiss({ testcase: this.register.value});
    }
    else{
      this.register.value.action = 'new';
      this.viewCtrl.dismiss({ testcase: this.register.value});
    }
  }

  close()
  {
    this.viewCtrl.dismiss();
  }
}
