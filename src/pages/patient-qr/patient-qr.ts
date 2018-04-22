import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, Request, RequestMethod, Headers } from '@angular/http';

import { Storage } from '@ionic/storage';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import 'rxjs/add/operator/timeout';
/**
 * Generated class for the PatientQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-qr',
  templateUrl: 'patient-qr.html',
})
export class PatientQrPage {

  private loading: Loading;
  private viewerAddr: string;
  private serverName: string;
  private search = {
    isSearch: false,
    result: {
      isFound: false,
      fname: "",
      lname: "",
      addr: "",
      isAdd: false,
      loading: false
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner, private http: Http, private storage: Storage, private globalVars: GlobalVarsProvider) {
    this.serverName = this.globalVars.getServerName();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientQrPage');
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.viewerAddr = barcodeData.text;
      this.searchViewer();
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  searchViewer() {
    this.search = {
      isSearch: true,
      result: {
        isFound: false,
        fname: "",
        lname: "",
        addr: "",
        isAdd: false,
        loading: true
      }
    };
    this.storage.get('token').then((val) => {
      let url = this.serverName + "viewer/search";
      this.http.request(new Request({
        method: RequestMethod.Post,
        url: url,
        headers: new Headers({
          "Authorization": "bearer " + val.token
        }),
        body: {
          viewerAddr: this.viewerAddr
        }
      })).timeout(5000).map(res => res.json()).subscribe(data => {
        console.log(data);
        if (data.result == "success") {
          this.search.result.isFound = true;
          this.search.result.fname = data.message.fname;
          this.search.result.lname = data.message.lname;
          this.search.result.addr = data.message.ethaddress;
          let url2 = this.serverName + "permission/get";
          this.http.request(new Request({
            method: RequestMethod.Get,
            url: url2,
            headers: new Headers({
              "Authorization": "bearer " + val.token
            })
          })).timeout(5000).map(res => res.json()).subscribe(data => {

            console.log(data);
            if (data.result == "success") {
              for (let i = 0; i < data.message.length; i++) {
                if (data.message[i].ethaddress == this.viewerAddr) {
                  this.search.result.isAdd = true;
                }
              }
            }
            this.search.result.loading = false;
          }, error => {
            console.log(error);
            //this.showError('โปรดลองอีกครั้ง!');
          });
        } else {
          this.search.result.isFound = false;
        }
      }, error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'พบข้อผิดพลาด',
          subTitle: 'โปรดลองอีกครั้ง!',
          buttons: ['ตกลง']
        });
        alert.present();
      });
    });
  }

  addViewer(ethaddr: string) {
    this.showLoading();
    this.storage.get('token').then((val) => {
      let url = this.serverName + "permission/add";
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
            title: 'เพิ่มสำเร็จ',
            subTitle: 'กรุณารอ 10-15 นาที ระบบจึงจะทำการอัพเดต\n',
            buttons: ['ตกลง']
          });
          alert.present();
          this.loading.dismiss();
          this.search.isSearch = false;
          this.viewerAddr = "";
        } else {
          this.showError('โปรดลองอีกครั้ง!');
        }
      }, error => {
        console.log(error);
        this.showError('โปรดลองอีกครั้ง!');
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
      title: 'พบข้อผิดพลาด',
      subTitle: text,
      buttons: ['ตกลง']
    });
    alert.present();
  }

}
