import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PatientDrugallergyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-drugallergy',
  templateUrl: 'patient-drugallergy.html',
})
export class PatientDrugallergyPage {

  private drug_alls = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('records').then((val) => {
        console.log('drug_alls is ', val.DRUGALLERGY);
        this.drug_alls = val.DRUGALLERGY;        
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDrugallergyPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
