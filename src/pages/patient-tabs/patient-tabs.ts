import { Component } from '@angular/core';

import { PatientHomePage } from '../patient-home/patient-home';
import { PatientPermissionPage } from '../patient-permission/patient-permission';
import { PatientQrPage } from '../patient-qr/patient-qr';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'patient-tabs.html'
})
export class PatientTabsPage {

  tab1Root = PatientHomePage;
  tab2Root = PatientPermissionPage;
  tab3Root = PatientQrPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
