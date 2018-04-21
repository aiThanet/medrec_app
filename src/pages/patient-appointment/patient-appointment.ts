import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PatientAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-appointment',
  templateUrl: 'patient-appointment.html',
})
export class PatientAppointmentPage {
  private appointments = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('records').then((val) => {
        console.log('appointments is ', val.APPOINTMENT);
        this.appointments = val.APPOINTMENT;        
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientAppointmentPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
