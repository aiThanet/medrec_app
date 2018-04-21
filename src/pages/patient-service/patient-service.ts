import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PatientServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-service',
  templateUrl: 'patient-service.html',
})
export class PatientServicePage {

  private services = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('records').then((val) => {
        console.log('SERVICE is ', val.SERVICE);
        this.services = val.SERVICE;        
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientServicePage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
