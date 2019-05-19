import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';
import { WordpressService } from '../../services/wordpress.service'
import { PostPage } from '../post/post';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

   posts: Array<any> = new Array<any>();
   morePagesAvailable: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: AngularFireAuth, public toastCrtl: ToastController,
    public loadingCtrl: LoadingController, public wordpressservice: WordpressService) {
  }

  ionViewWillEnter(){
    this.morePagesAvailable = true;
    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressservice.getRecentPosts()
      .subscribe(data => {
        for(let post of data){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "<p>";

          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }

  logout(){
    let toast = this.toastCrtl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signOut();
    toast.setMessage('Logout com sucesso!');
    toast.present();

    this.navCtrl.setRoot(HomePage)
  }

  btn_allpost(event, post){
    this.navCtrl.push(PostPage, {
      item: post
    });
  }

  doInfinite(infinitScroll){
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpressservice.getRecentPosts(page)
    .subscribe(data => {
      for(let post of data){
        if(!loading){
          infinitScroll.complete();
        }

        this.posts.push(post);
        loading = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    });
  }

  doRefresh(refresher){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
