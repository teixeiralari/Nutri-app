import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { PostPage } from '../pages/post/post';
import { TabsPage } from '../pages/tabs/tabs';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DicasPage} from '../pages/dicas/dicas';
import { RegisterPage} from '../pages/register/register';
import { RecuperarPage} from '../pages/recuperar/recuperar';
import { ProfilePage} from '../pages/profile/profile';
import { WordpressService } from '../services/wordpress.service';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


const firebaseAuth = {
  apiKey: "AIzaSyDjJWNp0mdVIf7URPCz882aalyk_EFqovk",
  authDomain: "nutri-ed8b6.firebaseapp.com",
  databaseURL: "https://nutri-ed8b6.firebaseio.com",
  projectId: "nutri-ed8b6",
  storageBucket: "nutri-ed8b6.appspot.com",
  messagingSenderId: "1083790561487",
  // appID: "app-id",
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DicasPage,
    RegisterPage,
    RecuperarPage,
    ProfilePage,
    PostPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseAuth)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DicasPage,
    RegisterPage,
    RecuperarPage,
    ProfilePage,
    PostPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
