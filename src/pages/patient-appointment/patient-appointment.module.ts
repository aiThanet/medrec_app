import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAppointmentPage } from './patient-appointment';

@NgModule({
  declarations: [
    PatientAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAppointmentPage),
  ],
})
export class PatientAppointmentPageModule {}
