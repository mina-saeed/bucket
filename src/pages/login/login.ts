import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
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
  registerCredentials = { mobile: '12355678', password: '123456' };
  constructor(public nav: NavController,private auth: AuthServiceProvider,private alertCtrl: AlertController, private loadingCtrl: LoadingController,public http: Http) {
  }

   showPassword(input: any): any {
	input.type = input.type === 'password' ? 'text' : 'password';
	}
  public login() {
    this.showLoading()
    console.log(this.registerCredentials);
    console.log("hellooo");
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Content-Type', 'application/json');
    console.log(headers);
    console.log(JSON.stringify(this.registerCredentials)); 
    this.http.post('http://64.20.33.195/bucketUser/Service1.svc/Login', JSON.stringify(this.registerCredentials), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {

      alert('LOG: ' +data);

      //code snippet, get status code, anything from response
      let obj = JSON.parse(JSON.stringify(data)); //now this is in console type OBJECT
      var bodyArray = obj["_body"].split(',');
      console.log(bodyArray[0].LoginResult);
      this.nav.push('CameraPage');
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
