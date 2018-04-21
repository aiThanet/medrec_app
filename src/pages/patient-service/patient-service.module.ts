import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientServicePage } from './patient-service';

@NgModule({
  declarations: [
    PatientServicePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientServicePage),
  ],
})
export class PatientServicePageModule {}
