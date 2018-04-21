import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAccidentPage } from './patient-accident';

@NgModule({
  declarations: [
    PatientAccidentPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAccidentPage),
  ],
})
export class PatientAccidentPageModule {}
