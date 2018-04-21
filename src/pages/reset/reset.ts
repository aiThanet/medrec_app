import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  private resetCredentials = { email: '' };
  private loading: Loading;
  private serverName: string;
  private timeOut: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.serverName = this.globalVars.getServerName();
    this.timeOut = this.globalVars.getTimeOut();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

  public reset() {
    this.showLoading();
    let url = this.serverName + "patient/reset";

    this.http.post(url, {
      username: this.resetCredentials.email
    }).timeout(this.timeOut).map(res => res.json()).subscribe(data => {
      if (data.result == "success") {
        let alert = this.alertCtrl.create({
          title: 'ยืนยันการรีเซ็ตรหัสผ่าน',
          message: 'ลิงค์การเปลี่ยนรหัสผ่าน จะส่งไปที่อีเมลของท่าน',
          buttons: [{
            text: 'ตกลง', handler: () => {
              this.navCtrl.setRoot(LoginPage);
            }
          }]
        });
        alert.present();
      } else {
        this.showError('โปรดลองอีกครั้ง!');
      }
    }, error => {
      console.log(error);
      this.showError('โปรดลองอีกครั้ง!');
    });
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
