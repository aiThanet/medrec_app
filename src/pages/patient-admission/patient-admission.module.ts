import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAdmissionPage } from './patient-admission';

@NgModule({
  declarations: [
    PatientAdmissionPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAdmissionPage),
  ],
})
export class PatientAdmissionPageModule {}
