import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  mobile: string;
  password: string;
 
  constructor(mobile: string, password: string) {
    this.mobile = mobile;
    this.password = password;
  }
}


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
currentUser: User;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
  public login(credentials) {

  console.log(credentials);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');

    this.http.post('http://api.buckette.co/Service1.svc/Login', JSON.stringify(credentials), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {

      alert('LOG: ' +data);

      //code snippet, get status code, anything from response
      let obj = JSON.parse(JSON.stringify(data)); //now this is in console type OBJECT
      console.log(obj["_body"]);
      var bodyArray = obj["_body"].split(',');
      console.log(bodyArray[1]); //got deviceID, just an exmaple


    });


 
  }
  public getUserInfo() : User {
    return this.currentUser;
  }
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
