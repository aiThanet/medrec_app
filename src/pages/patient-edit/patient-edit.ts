import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, App } from 'ionic-angular';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../../pages/login/login'

/**
 * Generated class for the PatientEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-edit',
  templateUrl: 'patient-edit.html',
})
export class PatientEditPage {

  private editCredentials: any = {};
  private editForm: FormGroup;
  private serverName: string;
  private year: string;
  private token: any = {};
  private loading: Loading;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    let _now = new Date();
    this.token = navParams.get('token');
    console.log(this.token);
    this.year = _now.toISOString().substr(0, 10);
    this.serverName = this.globalVars.getServerName();
    this.editForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.pattern('^[ก-๙]+'), Validators.required])],
      lname: ['', Validators.compose([Validators.pattern('^[ก-๙]+'), Validators.required])],
      birthdate: ['', Validators.required],
      homeaddress: [''],
      gender: ['', Validators.required],
      telephone: ['', Validators.pattern('([0-9]){10}')],
      cid: ['', Validators.compose([Validators.pattern('([0-9]){13}'), Validators.required])]
    });
    this.initEditForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientEditPage');
  }

  initEditForm() {
    this.editCredentials.fname = this.token.fname;
    this.editCredentials.lname = this.token.lname;
    this.editCredentials.gender = this.token.gender;
    this.editCredentials.birthdate = String(this.token.birthdate).substr(0, 10);
    this.editCredentials.homeaddress = this.token.homeaddress;
    this.editCredentials.telephone = this.token.telephone;
    this.editCredentials.cid = this.token.cid;
  }

  edit() {
    this.showLoading();
    let url = this.serverName + "patient/edit";
    let body = {
      username: this.editCredentials.email,
      password: this.editCredentials.password,
      fname: this.editCredentials.fname,
      lname: this.editCredentials.lname,
      birthdate: this.editCredentials.birthdate,
      gender: this.editCredentials.gender,
      homeaddress: this.editCredentials.homeaddress,
      telephone: this.editCredentials.telephone,
      cid: this.editCredentials.cid
    };
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
          title: 'แก้ไขเสร็จสมบูรณ์',
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
