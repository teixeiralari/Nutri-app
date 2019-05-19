import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  email: string;
  fotoPerfil: boolean = false;
  facebook = {
    nome: '',
    fotourl: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: AngularFireAuth, public toastCrtl: ToastController) {

      this.email = fire.auth.currentUser.email;
      this.facebook.nome = fire.auth.currentUser.displayName;
      this.facebook.fotourl = fire.auth.currentUser.photoURL;

      if(this.facebook.fotourl == null){
        this.fotoPerfil = false;
      }else{
        this.fotoPerfil = true;
      }
  }

  logout(){
    let toast = this.toastCrtl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signOut();
    toast.setMessage('Logout com sucesso!');
    toast.present();

    this.navCtrl.setRoot(HomePage)
  }


}
