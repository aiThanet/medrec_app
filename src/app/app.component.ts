import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PatientResetPage } from '../pages/patient-reset/patient-reset';
import { PatientTabsPage } from '../pages/patient-tabs/patient-tabs'
import { ViewerTabsPage } from '../pages/viewer-tabs/viewer-tabs'
import { Storage } from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Keyboard } from '@ionic-native/Keyboard';
import { platformBrowser } from '@angular/platform-browser';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  currentUser: any;
  rootPage: any;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage , private deeplinks: Deeplinks, private push: Push, private keyboard : Keyboard, private localNotifications: LocalNotifications) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.keyboard.disableScroll(true);

      this.push.hasPermission().then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
           }
      });
    
      // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
      this.push.createChannel({
        id: "testchannel1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
      }).then(() => console.log('Channel created'));
      
      // Delete a channel (Android O and above)
      this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));  
      // Return a list of currently configured channels
      this.push.listChannels().then((channels) => console.log('List of channels', channels))
      
      // to initialize push notifications  
      const options: PushOptions = {
          android: {},
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          },
          windows: {},
          browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
          }
      };
    
      const pushObject: PushObject = this.push.init(options); 
      pushObject.on('notification').subscribe((notification: any) => {
        console.log('Received a notification', JSON.stringify(notification))
        this.localNotifications.schedule({
          id: 1,
          text: notification.message,
          sound: this.platform.is('android') ? 'file://sound.mp3': 'file://beep.caf',
          title: notification.title,
          icon: 'assets/imgs/logo.png'
        });
      }); 
      pushObject.on('registration').subscribe((registration: any) => {
          this.storage.ready().then(() => {
            this.storage.set('deviceID', registration.registrationId).then(() => {
              console.log('Device registered', JSON.stringify(registration))
          });
        });
      }); 
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      this.storage.ready().then(() => {
        //this.storage.remove('token');

        this.storage.get('token').then((val) => {
          this.currentUser = val;
          if (this.currentUser) {
            if (this.currentUser.type == "Viewer") {
              this.rootPage = ViewerTabsPage;
            } else {
              this.rootPage = PatientTabsPage;
            }
          } else {
            this.rootPage = LoginPage;
            this.deeplinks.route({
              '/reset/:id/:resetkey': PatientResetPage,
              '/register': RegisterPage
            }).subscribe(match => {
                console.error('Got match', match);
                alert(JSON.stringify(match));
                this.nav.push(match.$route, match.$args, { animate: false, animation: "none" });
              }, (nomatch) => {
              // nomatch.$link - the full link data
                alert(nomatch);
                console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
                console.error('nomatch.$link.path', JSON.stringify(nomatch.$link.path));
                if(nomatch.$link.path == "/register"){
                  // this.rootPage = RegisterPage;
                  this.nav.push(RegisterPage);
                }
                if(nomatch.$link.path.includes("/reset/")){
                  var path = nomatch.$link.path.split("/");
                  console.log(path.length);
                  if(path.length>2){
                    var args = {
                      id : path [1],
                      resetkey : path[2]
                    };                
                    this.nav.push(PatientResetPage, args);
                  }
                }
      
              }, () => {
              // nomatch.$link - the full link data
              console.error('Got a deeplink completed');
            });
          }
        });
      });   
    });
  }
}
