import { Component, ViewChild  } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { RecuperarPage } from '../recuperar/recuperar';
import { Users } from './users';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  users: Users = new Users();
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController,
    public toastCrtl: ToastController, public fire: AngularFireAuth) {

      this.tabBarElement = document.querySelector('.show-tabbar');

  }


ngAfterViewInit() {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  let tabs = document.querySelectorAll('.show-tabbar');
  if (tabs !== null){
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

  login(){
    let toast = this.toastCrtl.create({duration: 3000, position: 'bottom'});

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
       console.log('aqui temos a data: ', data);
       this.users.email == this.email.value;
       this.users.senha == this.password.value;
       //toast.setMessage('Usuário cadastrado com sucesso!');
       //toast.present();
       this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {
       if(error == 'auth/user-disabled'){
         toast.setMessage('Usuário está desabilitado.');
       }else if(error == 'auth/invalid-email'){
         toast.setMessage('O email digitado não é válido.');
       }else if (error == 'auth/user-not-found'){
         toast.setMessage('Usuário não encontrado.');
       }else if (error == 'auth/wrong-password'){
         toast.setMessage('Senha incorreta.');
       }

       toast.present();
    });
  }

  cadastrar(){
    this.navCtrl.push(RegisterPage);
  }

  recuperar(){
    this.navCtrl.push(RecuperarPage);
  }

  loginwithfacebook(){
    let toast = this.toastCrtl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider)
      .then(data => {
         toast.setMessage('Login realizado com sucesso');
         toast.present();
         this.navCtrl.setRoot(TabsPage);
      })
  }

  loginVisitante(){
    let toast = this.toastCrtl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signInAnonymously()
    .then(data => {
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) =>{
      if (error === 'auth/operation-not-allowed') {
        toast.setMessage('Modo visitante está desabilitado');
    }else{
      console.error(error);
    }
    toast.present();
    });
  }
}
