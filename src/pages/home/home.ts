import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private register : FormGroup;
  user:any;
  region:any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,public events: Events,
    public formBuilder: FormBuilder,public alertCtrl: AlertController) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    if(this.user)
    {
      this.register = this.formBuilder.group({
        Password: ["", Validators.required],
        Mobile : [this.user.Mobile,Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
    }
    else{
      this.register = this.formBuilder.group({
        Password: ['', Validators.required],
        Mobile : ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
      });
    }
   
  }

  logForm()
  {
    console.log(this.register.value);
    if(!this.region)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select Role',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    let activateapp = JSON.parse(localStorage.getItem('activateapp'));
    if(activateapp)
    {
      let members = (localStorage.getItem('members'))?JSON.parse(localStorage.getItem('members')):[];
      switch(this.region)
      {
        case 'Admin':
        if( (this.register.value.Mobile === "9922499333" && this.register.value.Password === "12345")||(this.register.value.Mobile === "9579553748" && this.register.value.Password === "2626"))
        {
          this.register.value.role = this.region;
          this.register.value.name = 'Admin';
          localStorage.setItem('user', JSON.stringify(this.register.value));
          this.events.publish('user:loggedIn');
          this.navCtrl.setRoot('AdminHomePage');
        }
        else{
          for (let index = 0; index < members.length; index++) {
            console.log("memeber",members[index]);
            if(this.register.value.Mobile === members[index].Mobile && this.register.value.Password === members[index].Password && members[index].access === "Admin Access")
            {
              members[index].role = this.region;
              members[index].name = members[index].Name;
              localStorage.setItem('user', JSON.stringify(members[index]));
              this.events.publish('user:loggedIn');
              this.navCtrl.setRoot('UserHomePage');
              return
            }
            
          }
          let toast = this.toastCtrl.create({
            message: 'Mobile or Password is incorrect',
            position: 'top',
            duration: 3000
          });
          toast.present();
        }
        break;
        case 'User':
        for (let index = 0; index < members.length; index++) {
          if(this.register.value.Mobile === members[index].Mobile && this.register.value.Password === members[index].Password)
          {
            members[index].role = this.region;
            members[index].name = members[index].Name;
            localStorage.setItem('user', JSON.stringify(members[index]));
            this.events.publish('user:loggedIn');
            this.navCtrl.setRoot('PatiententryPage');
            return
          }
          
        }
        let toast = this.toastCtrl.create({
          message: 'Mobile or Password is incorrect',
          position: 'top',
          duration: 3000
        });
        toast.present();
        break;
        default:
      }
    }
    else{
        let toast = this.toastCtrl.create({
        message: 'App is not activated yet, Please activate app first',
        position: 'top',
        duration: 3000
      });
      toast.present();
    }
  }  
}