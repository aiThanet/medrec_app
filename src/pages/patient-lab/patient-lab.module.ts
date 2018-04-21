import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientLabPage } from './patient-lab';

@NgModule({
  declarations: [
    PatientLabPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientLabPage),
  ],
})
export class PatientLabPageModule {}
