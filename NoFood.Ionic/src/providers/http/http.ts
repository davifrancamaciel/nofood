import { UsuarioProvider } from './../usuario/usuario';
import { SpinnerProvider } from './../spinner/spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertProvider } from '../alert/alert';
import { HttpResultModel } from '../../app/models/http-result-model';
import { NetworkProvider } from '../network/network';

@Injectable()
export class HttpProvider {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerProvider,
    private alertService: AlertProvider,
    private networkService: NetworkProvider
  ) {

  }
  public createCustomHeader(header?: HttpHeaders) {
    if (!header)
      header = new HttpHeaders();

    header = header.append('Content-Type', 'application/json')
    header = header.append('Accept', 'application/json')

    let token = UsuarioProvider.getToken
    if (token)
      header = header.append('x-access-token', token)

    return header;
  }

  public get(url: string): Promise<HttpResultModel> {
    this.spinnerService.show("Carregando os dados...");
    let header = this.createCustomHeader();

    return new Promise((resolve) => {
      if (this.networkService.isOnline) {
        this.http.get(url, { headers: header })
          .subscribe(_res => {
            this.spinnerService.hide();
            resolve({ success: true, data: _res, err: undefined });
          }, err => {
            this.spinnerService.hide();
            this.alertService.toast('Não foi possível consultar os dados, verifique sua conexão e tente novamente', 'bottom');
            resolve({ success: false, data: undefined, err: err });
          });
      }
      else {
        this.alertService.toast('Você está Offline, e infelizmente não pode ser carregado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public post(url: string, model: any): Promise<HttpResultModel> {
    this.spinnerService.show("Salvando informações...");
    return new Promise((resolve) => {
      if (this.networkService.isOnline) {
        this.http.post(url, model)
          .subscribe(_res => {
            this.spinnerService.hide();
            resolve({ success: true, data: _res, err: undefined });
          }, err => {
            this.spinnerService.hide();
            console.log(err)
            if (err.status == 400) {
              let msg = '';
              err.error.validation.forEach(_err => {
                msg += `<li>${_err.message}</li>`
              });
              this.alertService.alert(err.error.message, msg)
            } else if (err.status == 404) {
              this.alertService.alert("Informação", err.error.message)
            } else
              this.alertService.toast('Não foi possível consultar os dados, verifique sua conexão e tente novamente', 'bottom');
            resolve({ success: false, data: undefined, err: err });
          });
      }
      else {
        this.alertService.toast('Você está Offline, e infelizmente não pode ser carregado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public put(url: string, model: any): Promise<HttpResultModel> {
    this.spinnerService.show("Salvando informações...");
    return new Promise((resolve) => {
      if (this.networkService.isOnline) {
        this.http.post(url, model)
          .subscribe(_res => {
            this.spinnerService.hide();
            resolve({ success: true, data: _res, err: undefined });
          }, err => {
            this.spinnerService.hide();
            console.log(err)
            if (err.status == 400) {
              let msg = '';
              err.error.validation.forEach(_err => {
                msg += `<li>${_err.message}</li>`
              });
              this.alertService.alert(err.error.message, msg)
            } else
              this.alertService.toast('Não foi possível consultar os dados, verifique sua conexão e tente novamente', 'bottom');
            resolve({ success: false, data: undefined, err: err });
          });
      }
      else {
        this.alertService.toast('Você está Offline, e infelizmente não pode ser carregado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public delete(url: string): Promise<HttpResultModel> {
    this.spinnerService.show("Removendo registro...");
    return new Promise((resolve) => {
      if (this.networkService.isOnline) {
        this.http.delete(url)
          .subscribe(_res => {
            this.spinnerService.hide();
            resolve({ success: true, data: _res, err: undefined });
          }, err => {
            this.spinnerService.hide();
            this.alertService.toast('Não foi possível relaizar a exclusão do resgistro.', 'bottom');
            resolve({ success: false, data: undefined, err: err });
          });
      }
      else {
        this.alertService.toast('Você está Offline, e infelizmente não pode ser carregado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

}
