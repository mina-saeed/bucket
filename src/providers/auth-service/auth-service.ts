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
  var headers = new Headers();
  headers.append('Content-Type', 'application/json' );
  let options = new RequestOptions({ headers: headers });
  console.log(options);

  this.http.post("http://64.20.33.195/bucketUser/Service1.svc/Login", credentials, options)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
    if (credentials.mobile === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "mina" && credentials.mobile === "mina");
        this.currentUser = new User('mina', 'mina');
        observer.next(access);
        observer.complete();
      });
    }
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
