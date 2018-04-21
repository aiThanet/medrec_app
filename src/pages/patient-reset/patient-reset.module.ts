import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientResetPage } from './patient-reset';

@NgModule({
  declarations: [
    PatientResetPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientResetPage),
  ],
})
export class PatientResetPageModule {}
