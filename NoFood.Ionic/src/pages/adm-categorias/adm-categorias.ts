import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoria-model';
import { CategoriaProvider } from '../../providers/categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-adm-categorias',
  templateUrl: 'adm-categorias.html',
})
export class AdmCategoriasPage {

  lista: Array<CategoriaModel> = new Array<CategoriaModel>();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoriaSrv: CategoriaProvider
  ) {
    this._loadingData();
  }



  private async _loadingData(): Promise<void> {
    let cateforiaResult = await this.categoriaSrv.get();
    if (cateforiaResult.success)
      this.lista = cateforiaResult.data as CategoriaModel[]
  }

  addOrEdit(model?: CategoriaModel) {
    this.navCtrl.push("AdmCategoriaPage", { _categoria: model })
  }
}
