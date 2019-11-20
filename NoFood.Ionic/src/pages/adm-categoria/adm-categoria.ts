import { CameraProvider } from './../../providers/camera/camera';
import { CategoriaModel } from './../../app/models/categoria-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adm-categoria',
  templateUrl: 'adm-categoria.html',
})
export class AdmCategoriaPage {

  categoria: CategoriaModel = new CategoriaModel()
  //https://www.udemy.com/ionic-construindo-um-app-estilo-food-com-nodejs/learn/lecture/11462258#content
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private cameraProvider: CameraProvider,
    private platform: Platform) {
  }

  ionViewDidLoad() {
    const cat = this.navParams.get('_categoria')

    if (cat)
      this.categoria = cat as CategoriaModel;
  }

  getPictureOption() {
    let actionSheet = this.actionSheetController.create({
      title: 'Adicionar foto',
      buttons: [
        {
          text: 'Tirar foto',
          icon: this.platform.is('ios') ? null : 'camera',
          handler: () => {
            this.cameraProvider.takePicture(photo => {
              this.categoria.foto = photo
            })
          },
        },
        {
          text: 'Pegar da galeria',
          icon: this.platform.is('ios') ? null : 'images',
          handler: () => {
            this.cameraProvider.getPictureFromGalery(photo => {
              this.categoria.foto = photo
            })
          },
        },
        {
          icon: this.platform.is('ios') ? null : 'close',
          text: 'Cancelar',
          role: 'destructive',
          handler: () => { }
        }
      ]
    })
    actionSheet.present()
  }
}
