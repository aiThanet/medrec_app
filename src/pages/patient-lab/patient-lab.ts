import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PatientLabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-lab',
  templateUrl: 'patient-lab.html',
})
export class PatientLabPage {

  private labs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('records').then((val) => {
        console.log('Lab is ', val.LAB);
        this.labs = val.LAB;        
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientLabPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
