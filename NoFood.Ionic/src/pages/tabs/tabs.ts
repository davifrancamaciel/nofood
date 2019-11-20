import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App

  ) {
  }

  ionViewDidLoad() {

  }

  selecionarCategoria(event) {
    let navegacaoAnterior = event.linker._history[event.linker._history.length - 2]
    console.log(navegacaoAnterior)
    if (event.tabTitle === 'Categorias' && navegacaoAnterior != '/categorias')
      this.app.getRootNav().setRoot('CategoriaPage')
  }
}
