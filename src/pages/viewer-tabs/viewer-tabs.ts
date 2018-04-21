import { Component } from '@angular/core';

import { ViewerHomePage } from '../viewer-home/viewer-home';
import { ViewerPermissionPage } from '../viewer-permission/viewer-permission';
import { ViewerQrPage } from '../viewer-qr/viewer-qr';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'viewer-tabs.html'
})
export class ViewerTabsPage {

  tab1Root = ViewerHomePage;
  tab2Root = ViewerPermissionPage;
  tab3Root = ViewerQrPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
