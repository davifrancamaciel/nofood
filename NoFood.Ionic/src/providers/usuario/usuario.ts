import { HttpResultModel } from './../../app/models/http-result-model';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/provider-base';
import { UsuarioModel } from '../../app/models/usuario-model';
import { HttpProvider } from '../http/http';
import { ConfigHelper } from '../../app/helpers/configHelper';

@Injectable()
export class UsuarioProvider extends ProviderBase<UsuarioModel>{

  url = `${ConfigHelper.Url}/usuario`;

  constructor(public httpProvider: HttpProvider) {
    super(`${ConfigHelper.Url}/usuario`, httpProvider)
  }

  async autenticate(email: string, senha: string): Promise<HttpResultModel> {
    return this.httpProvider.post(`${this.url}/autenticar`, { email: email, senha: senha })
  }

  async cadastrar(usuario: UsuarioModel): Promise<HttpResultModel> {
    return this.httpProvider.post(`${this.url}/registrar`, usuario)
  }

  static registerLogin(retorno: any) {
    localStorage.setItem(ConfigHelper.storageKeys.token, retorno.token)
    localStorage.setItem(ConfigHelper.storageKeys.user, JSON.stringify(retorno.usuario))
  }

  static get isLogado(): boolean {
    return (localStorage.getItem(ConfigHelper.storageKeys.token) != undefined)
  }

  static get getToken(): string {
    return localStorage.getItem(ConfigHelper.storageKeys.token)
  }
}

