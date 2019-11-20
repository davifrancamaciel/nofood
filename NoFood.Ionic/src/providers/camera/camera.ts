import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class CameraProvider {

  constructor(
    private camera: Camera,
    private platform: Platform
  ) { }

  private _getPicture(souce: number, callback: any): void {

    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        try {
          let options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: souce,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,// salva na galeria da pessoa se true
            correctOrientation: true
          }
          this.camera.getPicture(options).then((imageData) => {
            let base64Image = `data:image/jpeg;base64,${imageData}`;
            callback(base64Image)
          }, err => {
            console.log('Problema ao capturar a foto ', err)
          })
        } catch (error) {
          console.log('Problema ao tirar a foto ', error)
        }
      })
    } else {
      alert('Funcionalidade disponível somente no diviice!!!');
    }
  }

  getPictureFromGalery(callback) {
    this._getPicture(this.camera.PictureSourceType.PHOTOLIBRARY, photo => { callback(photo) })
  }

  takePicture(callback) {
    this._getPicture(this.camera.PictureSourceType.CAMERA, photo => { callback(photo) })
  }
}
