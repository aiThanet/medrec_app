import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientDrugPage } from './patient-drug';

@NgModule({
  declarations: [
    PatientDrugPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientDrugPage),
  ],
})
export class PatientDrugPageModule {}
