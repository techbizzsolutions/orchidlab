import { Component, ViewChild } from '@angular/core';
import {
  Nav,
  Platform,
  AlertController,
  IonicApp,
  MenuController,
  Events
} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({ templateUrl: 'app.html' })
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  showedAlert: boolean = false;
  confirmAlert: any;
  user: any;
  pages: Array<{
    title: string,
    component?: any,
    icon: any
  }>;
  constructor(public platform: Platform, public menuCtrl: MenuController, public alertCtrl: AlertController, private ionicApp: IonicApp, public events: Events, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    events.subscribe('user:loggedIn', () => {
      this
        .menuCtrl
        .swipeEnable(true, 'menu1');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.initialisemenu();
    });
  }

  initializeApp() {
    this
      .platform
      .ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available. Here you can do
        // any higher level native things you might need.
        this
          .statusBar
          .styleDefault();
        this
          .statusBar
          .backgroundColorByHexString("#7d71e8");
        this
          .splashScreen
          .hide();
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log("*****", this.user);
        // used for an example of ngFor and navigation
        if (this.user) {
          this.initialisemenu();
          switch (this.user.role) {
            case 'Admin':
              this
                .menuCtrl
                .swipeEnable(true, 'menu1');
              this.rootPage = 'AdminHomePage';
              break;
            case 'User':
              this
                .menuCtrl
                .swipeEnable(true, 'menu1');
              this.rootPage = 'PatiententryPage';
              break;
            default:
              this
                .menuCtrl
                .swipeEnable(false, 'menu1');
              this.rootPage = HomePage;
          }

        } else {
          let activateapp = JSON.parse(localStorage.getItem('activateapp'));
          this
            .menuCtrl
            .swipeEnable(false, 'menu1');
          if (activateapp) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = 'ActivationAppPage';
          }

        }
        this
          .platform
          .registerBackButtonAction(() => {
            let activePortal = this
              .ionicApp
              ._loadingPortal
              .getActive() || this
                .ionicApp
                ._overlayPortal
                .getActive();
            this
              .menuCtrl
              .close();

            if (activePortal) {
              activePortal.dismiss();
              activePortal.onDidDismiss(() => { });
              //return;
            }

            if (this.ionicApp._modalPortal.getActive()) {
              this
                .ionicApp
                ._modalPortal
                .getActive()
                .dismiss();
              this
                .ionicApp
                ._modalPortal
                .getActive()
                .onDidDismiss(() => { });
              return;
            }
            if (this.nav.length() == 1) {
              if (!this.showedAlert) {
                this.confirmExitApp();
              } else {
                this.showedAlert = false;
                this
                  .confirmAlert
                  .dismiss();
              }
            }
            if (this.nav.canGoBack()) {
              this
                .nav
                .pop();
            }

          });
      });
  }

  initialisemenu() {
    switch (this.user.role) {
      case 'Admin':
        this.pages = [
          {
            title: 'Home',
            component: 'AdminHomePage',
            icon: 'ios-home'
          }, {
            title: 'Add User',
            component: 'AdminAddUserPage',
            icon: 'ios-create'
           },
           {
            title: 'Test Cases',
            component: 'TestcaselistPage',
            icon: 'md-medkit'
           },
           {
            title: 'Patient Entry',
            component: 'PatiententryPage',
            icon: 'ios-create'
           },
          {
            title: 'Company Information',
            component: 'CompanyInformationPage',
            icon: 'md-list-box'
          }, {
            title: 'Start Session',
            component: 'StartSessionPage',
            icon: 'md-time'
          }, {
            title: 'Log Out',
            icon: 'md-log-out'
          }
        ];
        break;
      case 'User':
        this.pages = [
          {
            title: 'Home',
            component: 'PatiententryPage',
            icon: 'ios-home'
          },
          {
            title: 'Test Cases',
            component: 'TestcaselistPage',
            icon: 'md-medkit'
          },
          {
            title: 'Previous Bill Entry',
            component: 'AdminHomePage',
            icon: 'md-list-box'
          },
          {
            title: 'Log Out',
            icon: 'md-log-out'
          }
        ];
        break;
      default:

    }

  }
  // confirmation pop up to exit from app
  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this
      .alertCtrl
      .create({
        subTitle: "Do you want to exit from the app?",
        buttons: [
          {
            text: 'NO',
            handler: () => {
              this.showedAlert = false;
              return;
            }
          }, {
            text: 'YES',
            handler: () => {
              this
                .platform
                .exitApp();
            }
          }
        ]
      });
    this
      .confirmAlert
      .present();
  }

  openPage(page) {
    // Reset the content nav to have just this page we wouldn't want the back button
    // to show in this scenario
    switch (page.title) {
      case 'Home':
        this
          .nav
          .setRoot(page.component);
        break;
      case 'Log Out':
        localStorage.removeItem('user');
        this
          .menuCtrl
          .swipeEnable(false, 'menu1');
        this
          .nav
          .setRoot(HomePage);
        break;
      default:
        {
          this
            .nav
            .push(page.component);
        }
    }
  }

}