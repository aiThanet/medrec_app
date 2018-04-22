import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { ShowprivatekeyPage } from '../../pages/showprivatekey/showprivatekey'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidation } from '../../validators/password';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})



export class RegisterPage {

  @ViewChild('registerSlider') registerSlider: any;

  private registerCredentials = { email: '', password: '', confirmPassword: '', fname: '', lname: '', birthdate: '', gender: '', homeaddress: '', telephone: '', cid: '', hospcode: '' };
  private loading: Loading;
  private serverName: string;
  private registerForm1: FormGroup;
  private registerForm2: FormGroup;
  private page = 1;
  private deviceID: string;
  private year: string;
  public hospitals = [{
    hospcode: '1',
    name: 'โรงพยาบาลจุฬา'
  }, {
    hospcode: '2',
    name: 'โรงพยาบาลศิริราช'
  }, {
    hospcode: '3',
    name: 'โรงพยาบาลรามาธิบดี'
  },
  {
    hospcode: '09082',
    name: 'โรงพยาบาลมีประวัติ'
  }]

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    let _now = new Date();
    this.storage.ready().then(() => {
      this.storage.get('deviceID').then((val) => {
        this.deviceID = val;
        console.log(val)
      });
    });
    this.year = _now.toISOString().substr(0, 10);
    this.serverName = this.globalVars.getServerName();
    this.registerForm1 = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],
      confirmPassword: ['', Validators.required],
      hospital: ['', Validators.required]
    }, { validator: PasswordValidation.MatchPassword });
    this.registerForm2 = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.pattern('^[ก-๙]+'), Validators.required])],
      lname: ['', Validators.compose([Validators.pattern('^[ก-๙]+'), Validators.required])],
      birthdate: ['', Validators.required],
      homeaddress: [''],
      gender: ['', Validators.required],
      telephone: ['', Validators.pattern('([0-9]){10}')],
      cid: ['', Validators.compose([Validators.pattern('([0-9]){13}'), Validators.required])]
    });
  }

  next() {
    if (this.page == 1) {
      this.registerSlider.slideNext();
      this.page = 2;
    }
  }

  prev() {
    if (this.page == 1) {
      this.navCtrl.pop()
    } else {
      this.page = 1;
      this.registerSlider.slidePrev();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.showLoading();

    let url = this.serverName + "patient/register";

    this.http.post(url, {
      username: this.registerCredentials.email,
      password: this.registerCredentials.password,
      fname: this.registerCredentials.fname,
      lname: this.registerCredentials.lname,
      birthdate: this.registerCredentials.birthdate,
      gender: this.registerCredentials.gender,
      homeaddress: this.registerCredentials.homeaddress,
      telephone: this.registerCredentials.telephone,
      cid: this.registerCredentials.cid,
      hospcode: this.registerCredentials.hospcode,
      deviceID: this.deviceID
    }).timeout(5000).map(res => res.json()).subscribe(data => {
      if (data.result == "success") {
        this.showLoading();
        let alert = this.alertCtrl.create({
          title: 'สมัครสมาชิกเสร็จสมบูรณ์ โปรดดำเนินการขั้นตอนต่อไป',
          message: 'ไปยังหน้าบันทึก privatekey ',
          buttons: [{
            text: 'ตกลง', handler: () => {
              this.navCtrl.setRoot(ShowprivatekeyPage, { privatekey: data.message.privatekey });
            }
          }]
        });
        alert.present();
      } else {
        let message = 'โปรดลองอีกครั้ง!';
        if (data.message == "This username is already in used") {
          message = 'อีเมลนี้ถูกใช้งานแล้ว โปรดลองอีกครั้ง!';
        }
        this.showError(message);
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
