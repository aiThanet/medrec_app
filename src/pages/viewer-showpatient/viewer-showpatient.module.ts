import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewerShowpatientPage } from './viewer-showpatient';

@NgModule({
  declarations: [
    ViewerShowpatientPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewerShowpatientPage),
  ],
})
export class ViewerShowpatientPageModule {}
