import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PatientDrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-drug',
  templateUrl: 'patient-drug.html',
})
export class PatientDrugPage {

  private drugs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('records').then((val) => {
        console.log('accidents is ', val.DRUG_OPD);
        this.drugs = val.DRUG_OPD;        
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDrugPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
