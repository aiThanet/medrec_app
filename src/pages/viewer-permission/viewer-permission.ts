import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { ViewerShowpatientPage } from '../viewer-showpatient/viewer-showpatient';
/**
 * Generated class for the ViewerPermissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewer-permission',
  templateUrl: 'viewer-permission.html',
})
export class ViewerPermissionPage {
  private serverName: string;
  private loading: Loading;
  private patients = [];
  private patientsBackup = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider) {
    this.serverName = this.globalVars.getServerName();
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewerPermissionPage');
  }

  initialize() {
    this.getPatient().catch(err => {
      console.log(err);
    })
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);

    this.getPatient().then(() => {
      refresher.complete();
    }).catch((err) => {
      console.log(err);
      refresher.complete();
    })
  }

  getPatient() {
    this.showLoading();
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((val) => {
        let url = this.serverName + "viewer/mypatient";
        this.http.request(new Request({
          method: RequestMethod.Get,
          url: url,
          headers: new Headers({
            "Authorization": "bearer " + val.token
          })
        })).timeout(5000).map(res => res.json()).subscribe(data => {
          console.log(data);
          if (data.result == "success") {
            this.patients = [];
            for (let i = 0; i < data.message.length; i++) {
              data.message[i].show = false;
              this.patients.push(data.message[i]);
            }
            this.patientsBackup = this.patients;
          }
          this.loading.dismiss();
          resolve(true);
        }, error => {
          console.log(error);
          this.showError('โปรดลองอีกครั้ง!');
          reject(error);
        });
      });
    });
  }

  revokePermission(ethaddr: string) {
    this.showLoading();
    this.storage.get('token').then((val) => {
      let url = this.serverName + "permission/revoke";
      this.http.request(new Request({
        method: RequestMethod.Post,
        url: url,
        headers: new Headers({
          "Authorization": "bearer " + val.token
        }),
        body: {
          viewerAddr: ethaddr
        }
      })).timeout(5000).map(res => res.json()).subscribe(data => {
        console.log(data);
        if (data.result == "success") {
          let alert = this.alertCtrl.create({
            title: 'เพิกถอนสำเร็จ',
            subTitle: 'กรุณารอ 10-15 นาที ระบบจึงจะทำการอัพเดต\n',
            buttons: ['ตกลง']
          });
          alert.present();
          this.loading.dismiss();
        } else {
          this.showError('โปรดลองอีกครั้ง!');
        }
      }, error => {
        console.log(error);
        this.showError('โปรดลองอีกครั้ง!');
      });
    });
  }

  viewPatient(patient: any) {
    console.log(patient);
    this.navCtrl.push(ViewerShowpatientPage, patient);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'กรุณารอสักครู่...',
      dismissOnPageChange: false
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

  searchItems(ev: any) {
    // Reset items back to all of the items
    this.patients = this.patientsBackup;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.patients = this.patients.filter((patient) => {
        return (patient.fname.toLowerCase().indexOf(val.toLowerCase()) > -1) || (patient.lname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
