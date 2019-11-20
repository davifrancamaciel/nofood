import { Injectable } from '@angular/core';
import { CategoriaModel } from '../../app/models/categoria-model';
import { ProviderBase } from '../../app/base/provider-base';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';

@Injectable()
export class CategoriaProvider extends ProviderBase<CategoriaModel>{

  url = `${ConfigHelper.Url}/categoria`;

  constructor(public httpProvider: HttpProvider) {
    super(`${ConfigHelper.Url}/categoria`, httpProvider)
  }

}
