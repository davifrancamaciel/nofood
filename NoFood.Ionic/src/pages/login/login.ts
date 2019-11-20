import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuarioservice: UsuarioProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  async login(): Promise<void> {
    let result = await this.usuarioservice.autenticate(this.form.email, this.form.senha)
    console.log(result)
    if (result.success) {
      UsuarioProvider.registerLogin(result.data)
      this.navCtrl.setRoot('CategoriaPage');
    }
  }
  cadastro() {
    this.navCtrl.setRoot('CadastroPage');
  }
}
