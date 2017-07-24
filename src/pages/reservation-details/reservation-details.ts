import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReservationDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservation-details',
  templateUrl: 'reservation-details.html',
})
export class ReservationDetailsPage {

  resultsReservation: {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resultsReservation =  this.navParams.get("results");
    console.log(this.resultsReservation);

    let x = this.resultsReservation["ReturnReservationByIdResult"]["reservationEndDateTime"];
    x = new Date(parseInt(x.substr(6)));
    this.resultsReservation["ReturnReservationByIdResult"]["reservationEndDateTime"] = x;
    x = this.resultsReservation["ReturnReservationByIdResult"]["reservationStartDateTime"];
    x = new Date(parseInt(x.substr(6)));
    this.resultsReservation["ReturnReservationByIdResult"]["reservationStartDateTime"] = x;
    //alert(x);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationDetailsPage');
  }

}
