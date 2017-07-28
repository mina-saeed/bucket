import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { CameraPage } from '../camera/camera';
import { NativeStorage } from '@ionic-native/native-storage';

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
  checkedField:boolean;

  constructor(private nativeStorage: NativeStorage, public nav: NavController,private alertCtrl: AlertController, private loadingCtrl: LoadingController,public http: Http) {
    this.nativeStorage.getItem('rememberItem')
  .then(
    data => {
      this.email = data["email"];
      this.password = data["password"];
      console.log(data);
      console.log(data["email"]);
    },
    error => console.error("no data stored to remember", error)
  );
  }

  public login() {
    this.showLoading()
    this.registerCred.email=this.email;
    this.registerCred.password=this.SHA1(this.password);

    //console.log(this.registerCred);
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    headers.append('Content-Type', 'application/json');
//    console.log(JSON.stringify(this.registerCred));
    this.http.post('http://64.20.33.195/bucketUser/Service1.svc/ReturnAdminByEmailAndPassword', JSON.stringify(this.registerCred), new RequestOptions({headers:headers}))
    .map(res => res).subscribe(data => {
      //code snippet, get status code, anything from response
      let dataJSON = JSON.parse(data["_body"]);
      console.log(dataJSON["ReturnAdminByEmailAndPasswordResult"]);
      if(dataJSON["ReturnAdminByEmailAndPasswordResult"] == ""){
        console.log("Please enter valid user and pass");
        alert("Please enter a valid username or password!");
        this.loading.dismiss();
      }else{
        let obj = JSON.parse(JSON.stringify(data)); //now this is in console type OBJECT
        var bodyArray = obj["_body"].split(',');
        console.log(bodyArray);
        this.nav.push(CameraPage); //to avoid back

        //if remember me is checked in, update the local storage
        if(this.checkedField == true){
          this.registerCred.password=this.password; //to remember the password without hashed!!!
          //console.log(this.registerCred);
          this.nativeStorage.setItem('rememberItem', this.registerCred)
            .then(
                () => console.log('Remembered data!'),
                  error => console.error('Error storing item', error)
                );
        }

        }
      }
    );
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

  updateChecked(){
     console.log('checked new state:' + this.checkedField);
  }
  SHA1(msg) {
   function rotate_left(n,s) {
     var t4 = ( n<<s ) | (n>>>(32-s));
     return t4;
   };
   function lsb_hex(val) {
     var str="";
     var i;
     var vh;
     var vl;
     for( i=0; i<=6; i+=2 ) {
       vh = (val>>>(i*4+4))&0x0f;
       vl = (val>>>(i*4))&0x0f;
       str += vh.toString(16) + vl.toString(16);
     }
     return str;
   };
   function cvt_hex(val) {
     var str="";
     var i;
     var v;
     for( i=7; i>=0; i-- ) {
       v = (val>>>(i*4))&0x0f;
       str += v.toString(16);
     }
     return str;
   };
   function Utf8Encode(string) {
     string = string.replace(/\r\n/g,"\n");
     var utftext = "";
     for (var n = 0; n < string.length; n++) {
       var c = string.charCodeAt(n);
       if (c < 128) {
         utftext += String.fromCharCode(c);
       }
       else if((c > 127) && (c < 2048)) {
         utftext += String.fromCharCode((c >> 6) | 192);
         utftext += String.fromCharCode((c & 63) | 128);
       }
       else {
         utftext += String.fromCharCode((c >> 12) | 224);
         utftext += String.fromCharCode(((c >> 6) & 63) | 128);
         utftext += String.fromCharCode((c & 63) | 128);
       }
     }
     return utftext;
   };
   var blockstart;
   var i, j;
   var W = new Array(80);
   var H0 = 0x67452301;
   var H1 = 0xEFCDAB89;
   var H2 = 0x98BADCFE;
   var H3 = 0x10325476;
   var H4 = 0xC3D2E1F0;
   var A, B, C, D, E;
   var temp;
   msg = Utf8Encode(msg);
   var msg_len = msg.length;
   var word_array = new Array();
   for( i=0; i<msg_len-3; i+=4 ) {
     j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
     msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
     word_array.push( j );
   }
   switch( msg_len % 4 ) {
     case 0:
       i = 0x080000000;
     break;
     case 1:
       i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
     break;
     case 2:
       i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
     break;
     case 3:
       i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
     break;
   }
   word_array.push( i );
   while( (word_array.length % 16) != 14 ) word_array.push( 0 );
   word_array.push( msg_len>>>29 );
   word_array.push( (msg_len<<3)&0x0ffffffff );
   for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
     for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
     for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
     A = H0;
     B = H1;
     C = H2;
     D = H3;
     E = H4;
     for( i= 0; i<=19; i++ ) {
       temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
       E = D;
       D = C;
       C = rotate_left(B,30);
       B = A;
       A = temp;
     }
     for( i=20; i<=39; i++ ) {
       temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
       E = D;
       D = C;
       C = rotate_left(B,30);
       B = A;
       A = temp;
     }
     for( i=40; i<=59; i++ ) {
       temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
       E = D;
       D = C;
       C = rotate_left(B,30);
       B = A;
       A = temp;
     }
     for( i=60; i<=79; i++ ) {
       temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
       E = D;
       D = C;
       C = rotate_left(B,30);
       B = A;
       A = temp;
     }
     H0 = (H0 + A) & 0x0ffffffff;
     H1 = (H1 + B) & 0x0ffffffff;
     H2 = (H2 + C) & 0x0ffffffff;
     H3 = (H3 + D) & 0x0ffffffff;
     H4 = (H4 + E) & 0x0ffffffff;
   }
   var temp2 = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
   console.log(temp2);
   return temp2.toUpperCase();  ///for the sake of this app(bucket), home 3yzeeno toUpperCase

  }
}
