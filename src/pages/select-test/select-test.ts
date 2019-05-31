import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';
class Port {
  public action: string;
  public rate: string;
  public testname: string;
}
@Component({
  selector: 'page-select-test',
  templateUrl: 'select-test.html',
})
export class SelectTestPage {
  private register : FormGroup;
  Type:any;
  testlist =[];
  ports: Port[];
  port: Port;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController, public navParams: NavParams) {
      this.register = this.formBuilder.group({
        Description:[''],
        Rate: ['', Validators.required],
   });
  }

  portChange(event: {
    component: SelectSearchableComponent,
    value: any 
  }) {
      console.log('port:', event.value);
      this.register.controls['Rate'].setValue(event.value.rate);
      this.Type = event.value.testname;
  }

  logForm()
  {
    this.register.value.testname = this.Type;
    if(this.navParams.data.id)
    {
      this.register.value.action = 'edit';
      this.register.value.id = this.navParams.data.id;
      this.viewCtrl.dismiss({ testcase: this.register.value});

    }
    else{
      this.register.value.id = new Date().getTime();
      this.register.value.action = 'new';
      this.viewCtrl.dismiss({ testcase: this.register.value});

    }
  }
  close()
  {
    this.viewCtrl.dismiss();
  }

  select(item)
  {
    console.log(item);
    this.register.controls['Rate'].setValue(item.rate);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTestPage',this.navParams.data);
    if(JSON.parse(localStorage.getItem('TestCaes')))
    {
      this.ports = JSON.parse(localStorage.getItem('TestCaes'));
     
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'First add at least one Test Case',
        position: 'top',
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss();
    }
    if(this.navParams.data.id)
    {
      this.register = this.formBuilder.group({
        Description: [this.navParams.data.Description],
        Rate: [this.navParams.data.Rate, Validators.required]
        });
       this.port = {testname:this.navParams.data.testname, rate:this.navParams.data.Rate,action:'new'}; 
       this.Type = this.navParams.data.testname;
    }
  }

  compareFn(e1, e2): boolean {
    return e1 && e2 ? e1.testname === e2.testname : e1 === e2;
  }

}
