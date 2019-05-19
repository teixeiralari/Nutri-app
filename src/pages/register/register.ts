import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  tabBarElement: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public fire: AngularFireAuth, public toastCrtl: ToastController) {

    this.tabBarElement = document.querySelector('.show-tabbar');

  }

  ionViewWillEnter() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs == null){
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  ionViewWillLeave(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null){
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }



  registrar(){
    let toast = this.toastCrtl.create({duration: 3000, position: 'bottom'});

     this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
     .then(data => {
        console.log('aqui temos a data: ', data);
        toast.setMessage('Usuário cadastrado com sucesso!');
        toast.present();
        this.navCtrl.setRoot(TabsPage);
     })
     .catch((error: any) => {
        if(error == 'auth/email-already-in-use'){
          toast.setMessage('O email digitado já está em uso.');
        }else if(error == 'auth/invalid-email'){
          toast.setMessage('O email digitado não é válido.');
        }else if (error == 'auth/operation-not-allowed'){
          toast.setMessage('Operação não permitida.');
        }else if (error == 'auth/weak-password'){
          toast.setMessage('Senha muito fraca.');
        }

        toast.present();
     });
  }

}
