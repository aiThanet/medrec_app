import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the PatientViewprivatekeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-viewprivatekey',
  templateUrl: 'patient-viewprivatekey.html',
})
export class PatientViewprivatekeyPage {

  private serverName: string;
  private password: string;
  private token: string;
  private loading: Loading;
  private privatekey: string;

  constructor(private clipboard: Clipboard, public navCtrl: NavController, private loadingCtrl: LoadingController, private alertCtrl: AlertController, public navParams: NavParams, private storage: Storage, private http: Http, private globalVars: GlobalVarsProvider) {
    this.serverName = this.globalVars.getServerName();
    this.password = navParams.get('password');
    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        this.token = val.token;
        this.initialize();
      });
    });

  }

  initialize() {
    this.showLoading();
    console.log(this.password);
    let url = this.serverName + "patient/privatekey";
    this.http.request(new Request({
      method: RequestMethod.Post,
      url: url,
      headers: new Headers({
        "Authorization": "bearer " + this.token
      }),
      body: { password: this.password }
    })).timeout(5000).map(res => res.json()).subscribe(data => {
      console.log(data)
      if (data.result == "success") {
        this.privatekey = data.message.privatekey;
        this.loading.dismiss();
      } else {
        this.navCtrl.pop();
        this.showError('โปรดลองอีกครั้ง!');
      }
    }, error => {
      this.navCtrl.pop();
      console.log(error);
      this.showError('โปรดลองอีกครั้ง!');
    });
  }

  copy(text: string) {
    console.log(text);
    this.clipboard.copy(text);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientViewprivatekeyPage');
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'กรุณารอสักครู่...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'ล้มเหลว',
      subTitle: text,
      buttons: ['ตกลง']
    });
    alert.present();
  }


}
