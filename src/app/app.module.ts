import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler,DeepLinkConfig } from 'ionic-angular';
import { MyApp } from './app.component';
import { Deeplinks } from '@ionic-native/deeplinks';

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service/auth-service';

import { PatientTabsPage } from '../pages/patient-tabs/patient-tabs'

import { PatientHomePage } from '../pages/patient-home/patient-home';
import { PatientAccidentPage } from '../pages/patient-accident/patient-accident';
import { PatientAdmissionPage } from '../pages/patient-admission/patient-admission';
import { PatientAppointmentPage } from '../pages/patient-appointment/patient-appointment';
import { PatientDrugPage } from '../pages/patient-drug/patient-drug';
import { PatientDrugallergyPage } from '../pages/patient-drugallergy/patient-drugallergy';
import { PatientLabPage } from '../pages/patient-lab/patient-lab';
import { PatientServicePage } from '../pages/patient-service/patient-service';

import { PatientPermissionPage } from '../pages/patient-permission/patient-permission';
import { PatientQrPage } from '../pages/patient-qr/patient-qr';
import { PatientEditPage } from '../pages/patient-edit/patient-edit';
import { PatientResetPage } from '../pages/patient-reset/patient-reset';
import { PatientChangepasswordPage } from '../pages/patient-changepassword/patient-changepassword';
import { PatientViewprivatekeyPage } from '../pages/patient-viewprivatekey/patient-viewprivatekey'

import { ViewerTabsPage } from '../pages/viewer-tabs/viewer-tabs'
import { ViewerHomePage } from '../pages/viewer-home/viewer-home';
import { ViewerPermissionPage } from '../pages/viewer-permission/viewer-permission';
import { ViewerQrPage } from '../pages/viewer-qr/viewer-qr';
import { ViewerShowpatientPage } from '../pages/viewer-showpatient/viewer-showpatient';

import { SettingPage } from '../pages/setting/setting'
import { ResetPage } from '../pages/reset/reset'
import { RegisterPage } from '../pages/register/register'

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { Keyboard } from '@ionic-native/Keyboard';
import { Clipboard } from '@ionic-native/clipboard';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {Push, PushObject, PushOptions} from "@ionic-native/push";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PatientTabsPage,
    PatientHomePage,
    PatientAccidentPage,
    PatientAdmissionPage,
    PatientAppointmentPage,
    PatientDrugPage,
    PatientDrugallergyPage,
    PatientLabPage,
    PatientServicePage,
    PatientPermissionPage,
    PatientQrPage,
    PatientEditPage,
    PatientResetPage,
    PatientChangepasswordPage,
    PatientViewprivatekeyPage,
    ViewerTabsPage,
    ViewerHomePage,
    ViewerPermissionPage,
    ViewerQrPage,
    ViewerShowpatientPage,
    SettingPage,
    ResetPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    NgxQRCodeModule,
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PatientTabsPage,
    PatientHomePage,
    PatientAccidentPage,
    PatientAdmissionPage,
    PatientAppointmentPage,
    PatientDrugPage,
    PatientDrugallergyPage,
    PatientLabPage,
    PatientServicePage,
    PatientPermissionPage,
    PatientQrPage,
    PatientEditPage,
    PatientChangepasswordPage,
    PatientViewprivatekeyPage,
    PatientResetPage,
    ViewerTabsPage,
    ViewerHomePage,
    ViewerPermissionPage,
    ViewerQrPage,
    ViewerShowpatientPage,
    SettingPage,
    ResetPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    BarcodeScanner,
    GlobalVarsProvider,
    Deeplinks,
    LocalNotifications,
    Keyboard,
    Push,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Clipboard
  ]
})
export class AppModule {}

export const deepLinkConfig: DeepLinkConfig = {
	links: [
    { component: ResetPage, name: 'ResetPage', segment: 'reset/:id/:resetsecret' },
    { component: RegisterPage, name: 'RegisterPage', segment: 'register' }
	]
};