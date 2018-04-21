import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PatientAdmissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-admission',
  templateUrl: 'patient-admission.html',
})
export class PatientAdmissionPage {

  private admissions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('records').then((val) => {
        console.log('admission is ', val.ADMISSION);
        this.admissions = val.ADMISSION;        
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientAdmissionPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
