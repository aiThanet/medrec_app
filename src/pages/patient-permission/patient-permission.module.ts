import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientPermissionPage } from './patient-permission';

@NgModule({
  declarations: [
    PatientPermissionPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientPermissionPage),
  ],
})
export class PatientPermissionPageModule {}
