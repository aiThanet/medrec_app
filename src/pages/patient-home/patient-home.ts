import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { PatientAccidentPage } from '../patient-accident/patient-accident';
import { PatientAdmissionPage } from '../patient-admission/patient-admission';
import { PatientAppointmentPage } from '../patient-appointment/patient-appointment';
import { PatientDrugPage } from '../patient-drug/patient-drug';
import { PatientDrugallergyPage } from '../patient-drugallergy/patient-drugallergy';
import { PatientLabPage } from '../patient-lab/patient-lab';
import { PatientServicePage } from '../patient-service/patient-service';

/**
 * Generated class for the PatientHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-home',
  templateUrl: 'patient-home.html',
})
export class PatientHomePage {

  private myprofile = {};
  private loading: Loading;
  private serverName: string;
  private PERSON = {};
  private cardL = []
  private startSpinner: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider) {
    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        console.log('val is ', val);
        this.serverName = this.globalVars.getServerName();
        this.myprofile = val;
        this.initialize();
      });
    });
  }

  initialize() {
    this.startSpinner = true;
    this.getAll().then(() => {
      this.startSpinner = false;
    }).catch((err) => {
      console.log(err);
      this.startSpinner = false;
    });
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.getAll().then(() => {
      refresher.complete();
    }).catch(() => {
      refresher.complete();
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((val) => {
        if (val.status == 2) {
          let url = this.serverName + "record/getall";
          console.log(val.token)
          this.http.request(new Request({
            method: RequestMethod.Post,
            url: url,
            body: { patient: val.username },
            headers: new Headers({
              "Authorization": "bearer " + val.token,  
              'Content-Type': 'application/json'
            })
          })).timeout(20000).map(res => res.json()).subscribe(data => {
            console.log(data);
            if (data.result == "success") {
              this.cardL = [data.message.ACCIDENT.length, data.message.ADMISSION.length, data.message.APPOINTMENT.length, data.message.CHRONIC.length, data.message.DRUG_OPD.length, data.message.DISABILITY.length, data.message.DRUGALLERGY.length, data.message.LAB.length, data.message.SERVICE.length]
              console.log("cardL", this.cardL)
              if (data.message.PERSON.length > 0) {
                this.PERSON = data.message.PERSON[0];
              }
              console.log(this.PERSON);
              this.storage.set('records', data.message).then(() => {
                console.log("records store done");
                resolve(true);
              });
            }
            else {
              this.showError('Permisson err!');
              resolve(true);
            }

          }, error => {
            console.log(error);
            this.showError('โปรดลองอีกครั้ง!');
            reject(error);
          });
        } else {
          //
        }

      });
    });
  }

  showError(text) {

    let alert = this.alertCtrl.create({
      title: 'พบข้อผิดพลาด',
      subTitle: text,
      buttons: ['ตกลง']
    });
    alert.present();
  }

  goToPatientAccidentPage() {
    this.navCtrl.push(PatientAccidentPage);
  }

  goToPatientAdmissionPage() {
    this.navCtrl.push(PatientAdmissionPage);
  }

  goToPatientAppointmentPage() {
    this.navCtrl.push(PatientAppointmentPage);
  }

  goToPatientDrugPage() {
    this.navCtrl.push(PatientDrugPage);
  }

  goToPatientDrugallergyPage() {
    this.navCtrl.push(PatientDrugallergyPage);
  }

  goToPatientLabPage() {
    this.navCtrl.push(PatientLabPage);
  }

  goToPatientServicePage() {
    this.navCtrl.push(PatientServicePage);
  }

}