import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {
  }

  gerenciarCategoria() {
    this.navCtrl.push('AdmCategoriasPage')
  }


}
