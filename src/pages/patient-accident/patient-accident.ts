import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PatientAccidentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-accident',
  templateUrl: 'patient-accident.html',
})
export class PatientAccidentPage {

  private accidents = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('records').then((val) => {
        console.log('accidents is ', val.ACCIDENT);
        this.accidents = val.ACCIDENT;        
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientAccidentPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
