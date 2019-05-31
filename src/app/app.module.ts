import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { DateTimeProvider } from '../providers/date-time/date-time';
import { FilterPage } from '../pages/filter/filter';
import { AdvanceFilterPage } from '../pages/advance-filter/advance-filter';
import { TestcasePage } from '../pages/testcase/testcase';
import { Printer } from '@ionic-native/printer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SelectTestPage } from '../pages/select-test/select-test';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FilterPage,
    AdvanceFilterPage,
    TestcasePage,
    SelectTestPage
  ],
  imports: [
BrowserModule,
    HttpModule,
    HttpClientModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FilterPage,
    AdvanceFilterPage,
    TestcasePage,
    SelectTestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    Printer,
    File,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DateTimeProvider
  ]
})
export class AppModule {}
