import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ViewerHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewer-home',
  templateUrl: 'viewer-home.html',
})
export class ViewerHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        console.log('val is ', val);
        this.myprofile = val;
      });
    });
  }

  private myprofile = { fname: "", lname: "" };

}
