import { HttpProvider } from '../../providers/http/http';
import { HttpResultModel } from '../models/http-result-model';
export abstract class ProviderBase<T> {

  constructor(
    public url: string,
    public http: HttpProvider,
  ) {
  }

  get(): Promise<HttpResultModel> {
    return this.http.get(this.url);
  }

  getBiId(id: string): Promise<HttpResultModel> {
    return this.http.get(`${this.url}/${id}`);
  }

  post(model: T): Promise<HttpResultModel> {
    return this.http.post(this.url, model);
  }

  put(model: T, id: string): Promise<HttpResultModel> {
    return this.http.put(`${this.url}/${id}`, model);
  }

  delete(id: string): Promise<HttpResultModel> {
    return this.http.delete(this.url);
  }
}
