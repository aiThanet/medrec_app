import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { LoginPage } from '../../pages/login/login'

/**
 * Generated class for the ShowprivatekeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showprivatekey',
  templateUrl: 'showprivatekey.html',
})
export class ShowprivatekeyPage {

  private privatekey: string;

  constructor(private clipboard: Clipboard, public navCtrl: NavController, public navParams: NavParams) {
    this.privatekey = this.navParams.get('privatekey')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowprivatekeyPage');
  }

  gotoHomepage() {
    this.navCtrl.setRoot(LoginPage);
  }

  copy(text: string) {
    console.log(text);
    this.clipboard.copy(text);
  }

}
