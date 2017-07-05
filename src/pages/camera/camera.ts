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

    //**** NO ERROR HANDLING DONE

    public photos: any;
    public base64Image: string;
           url:string;
    //options: BarcodeScannerOptions;

    constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
        private alertCtrl: AlertController,
        private barcodeScanner: BarcodeScanner,
        public http:Http) {

          this.url = 'http://207.154.240.16:3003/'; //please change it
        }

      results: {}; //json

      async scan(){
        this.results = await this.barcodeScanner.scan();
        alert(this.results); //.text //.format //.cancelled
        console.log(this.results);

        let obj = JSON.parse(JSON.stringify(this.results)); //now this is in console type OBJECT
        console.log(obj["text"]);
        console.log(obj["format"]);
        alert(obj["text"]);

        //change route url in constructor and here
        //change body to the request body (obj["text"])
        //if get request, change get to post, and remove body, and modify url!

      }



}
