import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-admin-add-user',
  templateUrl: 'admin-add-user.html',
})
export class AdminAddUserPage {
  private register : FormGroup;
  access = "Operator Access";
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,public navParams: NavParams) {
    this.register = this.formBuilder.group({
      Name:['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword:['', Validators.required],
      Mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddUserPage');
  }

  logForm()
  {
    console.log(this.access,'ionViewDidLoad AdminAddUserPage',this.register.value);
    if(this.register.value.Password === this.register.value.ConfirmPassword)
    {
        let members = JSON.parse(localStorage.getItem('members'));
        let date = new Date();
        date.setDate(date.getDate() - 6);
        let From7 = date.toISOString().slice(0, 10);
        this.register.value.session = From7;
        this.register.value.access = this.access;
        if(members)
        {
          for (let index = 0; index < members.length; index++) {
            if(members[index].Mobile == this.register.value.Mobile)
            {
              let toast = this.toastCtrl.create({
                message: 'Mobile number is already registered',
                position: 'top',
                duration: 3000
              });
              toast.present();
              return;
            }
            
          }
          members.push(this.register.value);
          localStorage.setItem('members', JSON.stringify(members));
          let toast = this.toastCtrl.create({
            message: 'User has been added successfully',
            position: 'top',
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot('AdminHomePage');
        }
        else{
          let data = [];
          data.push(this.register.value);
          localStorage.setItem('members', JSON.stringify(data));
          let toast = this.toastCtrl.create({
            message: 'User has been added successfully',
            position: 'top',
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot('AdminHomePage');
        }
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Password does not match',
        position: 'top',
        duration: 3000
      });
      toast.present();
    }
  }

}
