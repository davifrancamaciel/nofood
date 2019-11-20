import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class SpinnerProvider {

  private spinner: Loading = null;
  constructor(
    private loading: LoadingController
  ) {

  }
  async show(message: string) {
    if (this.spinner == null) {
      this.spinner = await this.loading.create({
        content: (message || 'Carregando...')
      })
      this.spinner.present()
    } else {
      this.spinner.data.content = message;
    }
  }
  hide() {
    if (this.spinner != null) {
      this.spinner.dismiss();
      this.spinner = null;
    }
  }
}
