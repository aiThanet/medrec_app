import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, App } from 'ionic-angular';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { LoginPage } from '../../pages/login/login'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidation } from '../../validators/password';

/**
 * Generated class for the PatientResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-reset',
  templateUrl: 'patient-reset.html',
})
export class PatientResetPage {

  private changepasswordCredentials: any = {};
  private url : string;
  private loading: Loading;
  private serverName: string;
  private changepasswordForm: FormGroup;
  private token: any = {};

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    this.serverName = this.globalVars.getServerName();
    this.token = navParams.get('token');
    var id = navParams.get('id');
    var resetkey = navParams.get('resetkey');
    this.url = this.serverName + "/patient/reset/" + id + "/" + resetkey; 
    console.log(this.url);
    this.changepasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],
      confirmPassword: ['', Validators.required],
      privatekey: ['', Validators.required]
    }, { validator: PasswordValidation.MatchPassword });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientResetPage');
  }

  changePassword() {
    this.showLoading();
    let url = this.serverName + "patient/resetpassword";
    let body = {
      password: this.changepasswordCredentials.password,
      privatekey: this.changepasswordCredentials.privatekey
    };
    console.log(body)
    this.http.request(new Request({
      method: RequestMethod.Post,
      url: url,
      headers: new Headers({
        "Authorization": "bearer " + this.token.token
      }),
      body: body
    })).timeout(5000).map(res => res.json()).subscribe(data => {
      if (data.result == "success") {
        let alert = this.alertCtrl.create({
          title: 'เปลี่ยนรหัสผ่านเสร็จสมบูรณ์',
          message: '',
          buttons: [{
            text: 'ตกลง', handler: () => {
              this.logout();
            }
          }]
        });
        alert.present();
      } else {
        let message = 'โปรดลองอีกครั้ง!';
        if (data.message == "Your private key does't match") {
          message = 'Private key ไม่ถูกต้อง!';
        }
        this.showError(message);
      }
    }, error => {
      console.log(error);
      this.showError('โปรดลองอีกครั้ง!');
    });
  }

  logout() {
    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        console.log(val);
        let url = this.serverName + val.type.toLowerCase() + "/logout";
        this.http.request(new Request({
          method: RequestMethod.Post,
          url: url,
          headers: new Headers({
            "Authorization": "bearer " + val.token
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
