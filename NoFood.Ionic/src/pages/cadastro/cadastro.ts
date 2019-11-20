import { AlertProvider } from './../../providers/alert/alert';
import { UsuarioModel } from './../../app/models/usuario-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario: UsuarioModel = new UsuarioModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuarioservice: UsuarioProvider,
    private alertService: AlertProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cancelar() {
    this.navCtrl.setRoot('LoginPage');
  }

  async  cadastrar(): Promise<void> {
    let result = await this.usuarioservice.cadastrar(this.usuario)
    console.log(result)
    if (result.success) {
      this.alertService.toast('Cadastro realizado com sucesso', 'botton')
      this.navCtrl.setRoot('LoginPage');
    }
  }
  //https://www.udemy.com/ionic-construindo-um-app-estilo-food-com-nodejs/learn/v4/t/lecture/11392918?start=0
  //16:00
}

