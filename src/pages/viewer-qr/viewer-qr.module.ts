import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewerQrPage } from './viewer-qr';

@NgModule({
  declarations: [
    ViewerQrPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewerQrPage),
  ],
})
export class ViewerQrPageModule {}
