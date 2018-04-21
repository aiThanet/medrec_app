import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientQrPage } from './patient-qr';

@NgModule({
  declarations: [
    PatientQrPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientQrPage),
  ],
})
export class PatientQrPageModule {}
