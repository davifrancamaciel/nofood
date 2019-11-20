import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }


  toast(title: string, position: string) {
    let toastComponent = this.toastController.create({
      message: title,
      position: position,
      duration: 3000
    })
    toastComponent.present()
  }

  alert(title: string, message: string) {
    let alert = this.alertController.create({
      title: title,
      message: message,
      buttons: ['Ok']
    })
    alert.present()
  }

  confirm(title: string, message: string, callback: any) {
    let alert = this.alertController.create({
      title: title,
      message: message,
      buttons: [
        'Não',
        {
          text: 'Sim',
          handler: () => callback()
        }
      ]
    })
    alert.present()
  }
}
