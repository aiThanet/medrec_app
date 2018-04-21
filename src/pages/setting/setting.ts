import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { PatientChangepasswordPage } from '../patient-changepassword/patient-changepassword';
import { PatientViewprivatekeyPage } from '../patient-viewprivatekey/patient-viewprivatekey'
import { PatientEditPage } from '../patient-edit/patient-edit';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  private loginPage = LoginPage;
  private serverName: string;
  private userType: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public app: App, private storage: Storage, private http: Http, private globalVars: GlobalVarsProvider) {
    this.serverName = this.globalVars.getServerName();
    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        this.userType = val.type;
        console.log(this.userType)
      });
    });
  }

  logout() {
    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        console.log(val);
        // val.type = "patient";
        let url = this.serverName + val.type.toLowerCase() + "/logout";
        this.http.request(new Request({
          method: RequestMethod.Post,
          url: url,
          headers: new Headers({
            "Authorization": "bearer " + val.token,
            'Content-Type': 'application/json'
          })
        })).timeout(5000).map(res => res.json()).subscribe(data => {
          console.log(data)
          if (data.result == "success") {
            console.log(data);
          }
        }, error => {
          console.log(error);
          // let alert = this.alertCtrl.create({
          //   title: 'พบข้อผิดพลาด',
          //   subTitle: 'โปรดลองอีกครั้ง!',
          //   buttons: ['ตกลง']
          // });
          // alert.present();
        });
        this.storage.remove('token').then(() => {
          this.storage.remove('password').then(() => {
            this.app.getRootNav().setRoot(LoginPage)
          })
        })
      });
    });
  }

  viewprivatekey() {
    this.storage.get('password').then((val) => {
      this.navCtrl.push(PatientViewprivatekeyPage, { password: val });
    })
  }

  editProfile() {
    this.storage.get('token').then((val) => {
      this.navCtrl.push(PatientEditPage, { token: val });
    })
  }

  changePassword() {
    this.storage.get('token').then((val) => {
      this.navCtrl.push(PatientChangepasswordPage, { token: val });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
}
