import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { PatientTabsPage } from '../patient-tabs/patient-tabs';
import { ViewerTabsPage } from '../viewer-tabs/viewer-tabs';
import { ResetPage } from '../reset/reset'
import { RegisterPage } from '../register/register'
import { Http,RequestOptions,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: Loading;
  private loginCredentials = { email: '', password: '' };
  private usertype = false;
  private usertypename = "Patient";
  private usertypenameTH = "ผู้ป่วย"
  private serverName: string;
  constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider) {
    this.serverName = this.globalVars.getServerName();
  }

  public resetPassword() {
    this.nav.push(ResetPage);
  }
  public register() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading();

    let url = this.serverName + this.usertypename.toLowerCase() + "/login";
    let nextPage: any;
    console.log(url);

    if (this.usertype) {
      nextPage = ViewerTabsPage;
    } else {
      nextPage = PatientTabsPage;
    }
    this.http.post(url, {
      username: this.loginCredentials.email,
      password: this.loginCredentials.password
    ,headers: { 'Content-Type': 'application/json' }}).timeout(5000).map(res => res.json()).subscribe(data => {
      if (data.result == "success") {
        let statusName = "";
        if (data.message.status == 1) {
          statusName = 'รอการยืนยัน';
        } else if (data.message.status == 2) {
          statusName = 'ยืนยันแล้ว';
        } else {
          statusName = 'ไม่ผ่านการยืนยัน'
        }

        let token = {
          token: data.message.token,
          type: this.usertypename,
          ethaddress: data.message.ethaddress,
          username: data.message.username,
          status: data.message.status,
          statusName: statusName,
          fname: data.message.fname,
          lname: data.message.lname,
          hospcode: data.message.hospcode,
          gender: data.message.gender,
          homeaddress: data.message.homeaddress,
          birthdate: data.message.birthdate,
          cid: data.message.cid,
          telephone: data.message.telephone
        }
        this.storage.set('token', token).then(() => {
          this.storage.set('password', this.loginCredentials.password).then(() => {
            this.nav.setRoot(nextPage)
          });
        });
      } else {
        let alert = this.alertCtrl.create({
          title: 'อีเมล หรือ รหัสผ่านผิดพลาด',
          subTitle: 'โปรดลองอีกครั้ง!',
          buttons: ['ตกลง']
        });
        alert.present();
        this.loading.dismiss();
        this.loginCredentials.email = "";
        this.loginCredentials.password = "";
      }
    }, error => {
      console.error(JSON.stringify(error));
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

  changeUserType() {

    if (this.usertype) {
      this.usertypename = "Viewer";
      this.usertypenameTH = "แพทย์"
    } else {
      this.usertypename = "Patient";
      this.usertypenameTH = "ผู้ป่วย"
    }
  }

}