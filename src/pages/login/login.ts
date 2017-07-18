import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  email:any;
  password:any;
  registerCred = {email : '', password: '' };
  constructor(public nav: NavController,private alertCtrl: AlertController, private loadingCtrl: LoadingController,public http: Http) {
  }

  public login() {
    this.showLoading()
    this.registerCred.email=this.email;
    this.registerCred.password=this.password;
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Content-Type', 'application/json');
    console.log(JSON.stringify(this.registerCred)); 
    this.http.post('http://64.20.33.195/bucketUser/Service1.svc/ReturnAdminByEmailAndPassword', JSON.stringify(this.registerCred), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      //code snippet, get status code, anything from response
      let obj = JSON.parse(JSON.stringify(data)); //now this is in console type OBJECT
      var bodyArray = obj["_body"].split(',');
      console.log(bodyArray);
      this.nav.push('LandPage');
      });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
