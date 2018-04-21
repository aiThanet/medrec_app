import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ViewerQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewer-qr',
  templateUrl: 'viewer-qr.html',
})
export class ViewerQrPage {

  private qrData = null;
  private createdCode = null;
  private ethAddr: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private storage: Storage) {
    storage.get('token').then((val) => {
      this.ethAddr = val.ethaddress;
      this.createCode();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrPage');
  }

  createCode() {
    this.createdCode = this.ethAddr;
  }

}
