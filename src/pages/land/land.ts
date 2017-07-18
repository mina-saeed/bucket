import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LandPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-land',
  templateUrl: 'land.html',
})
export class LandPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandPage');
  }
   scan(){
   this.barcodeScanner.scan().then((barcodeData) => {
 // Success! Barcode data is here
}, (err) => {
    // An error occurred
});
   }

}
