import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewerPermissionPage } from './viewer-permission';

@NgModule({
  declarations: [
    ViewerPermissionPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewerPermissionPage),
  ],
})
export class ViewerPermissionPageModule {}
