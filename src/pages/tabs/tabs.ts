import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {DicasPage} from '../dicas/dicas';
import {ProfilePage} from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  DicasPage = DicasPage;
  ProfilePage = ProfilePage;

}
