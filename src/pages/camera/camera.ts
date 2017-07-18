import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {


    url:string;
    //options: BarcodeScannerOptions;

    constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
        private alertCtrl: AlertController,
        private barcodeScanner: BarcodeScanner,
        public http:Http) {

          this.url = 'http://64.20.33.195/ListBookingForEachUser'; //please change it
        }

      results: {}; //json

      async scan(){
        this.results = await this.barcodeScanner.scan();
        //alert(this.results); //.text //.format //.cancelled
        console.log(this.results);

        let obj = JSON.parse(JSON.stringify(this.results)); //now this is in console type OBJECT
        console.log(obj["text"]);
        console.log(obj["format"]);
        alert(obj["text"]);

        //change route url in constructor and here
        //change body to the request body (obj["text"])
        //if get request, change get to post, and remove body, and modify url!
        //authentication change it in headers

      /*  let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
        //  headers.append('Authorization', 'Basic YWRtaW46MTIzNDU2');

        let body = 
         {"reservationId":"8850c258-fb5a-478d-b2a9-e6ce3d88b9b6"};



        this.http.post(this.url, JSON.stringify(body), new RequestOptions({headers:headers}))
        .map(res => res).subscribe(data => {

            //what if success? code here
        });  */
        }



}
