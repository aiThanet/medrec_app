import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewerHomePage } from './viewer-home';

@NgModule({
  declarations: [
    ViewerHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewerHomePage),
  ],
})
export class ViewerHomePageModule {}
