import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientChangepasswordPage } from './patient-changepassword';

@NgModule({
  declarations: [
    PatientChangepasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientChangepasswordPage),
  ],
})
export class PatientChangepasswordPageModule {}
