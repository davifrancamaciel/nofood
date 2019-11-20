import { Camera } from '@ionic-native/camera';
import { CameraProvider } from './../../providers/camera/camera';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmCategoriaPage } from './adm-categoria';

@NgModule({
  declarations: [
    AdmCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmCategoriaPage),
  ],
  providers: [CameraProvider, Camera]
})
export class AdmCategoriaPageModule { }
