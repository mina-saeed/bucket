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
      resultsReservation: {};
      resultsNested: {};

      async scan(){
        this.results = await this.barcodeScanner.scan();
        //alert(this.results); //.text //.format //.cancelled
        console.log(this.results);

        let obj = JSON.parse(JSON.stringify(this.results)); //now this is in console type OBJECT

        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
        headers.append('Content-Type', 'application/json');

        let body = {
          "id": obj["text"]
        };

        this.http.post('http://64.20.33.195/bucketUser/Service1.svc/ReturnReservationById', body, new RequestOptions({headers:headers}))
        .map(res => res).subscribe(data => {
          //console.log(data);

          let dataJSON = JSON.parse(data["_body"]);
          this.resultsReservation = dataJSON;

          //console.log(dataJSON);
        //  console.log(dataJSON["ReturnReservationByIdResult"]["ID"]);
          }
          );
        }
}
