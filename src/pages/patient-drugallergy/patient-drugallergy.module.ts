import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientDrugallergyPage } from './patient-drugallergy';

@NgModule({
  declarations: [
    PatientDrugallergyPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientDrugallergyPage),
  ],
})
export class PatientDrugallergyPageModule {}
