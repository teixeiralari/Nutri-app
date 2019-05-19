import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the RecuperarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('email') emailDigitado;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public fire: AngularFireAuth, public toastCrtl: ToastController) {
  }

  recuperar(){
    let toast = this.toastCrtl.create({duration: 3000, position: 'bottom'});

  this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
  .then(data => {
     console.log('aqui temos a data: ', data);
     toast.setMessage('Solicitação foi enviada para seu email!');
     toast.present();
     this.navCtrl.pop();
  })
  .catch((error: any) => {
     if(error == 'auth/invalid-email'){
       toast.setMessage('O email digitado não é válido.');
     }else if (error == 'auth/user-not-found'){
       toast.setMessage('Usuário não encontrado.');
     }

     toast.present();
  });

}
}
