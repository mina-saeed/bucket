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

          this.url = 'http://207.154.240.16:3003/';
        }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CameraPage');
    }

    ngOnInit() {
        this.photos = [];
    }
 scanBarcode() {
 this.barcodeScanner.scan().then((barcodeData) => {
 // Success! Barcode data is here
}, (err) => {
    // An error occurred
});
    }




}
