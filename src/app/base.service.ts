import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class BaseService<T> {
  private hostname = 'http://localhost';
  private port = 8080;
  protected fullUrl = '';
  protected headers = new HttpHeaders();
  public parameters: HttpParams = new HttpParams();

  constructor(protected http: HttpClient, path: string) {
    this.fullUrl = `${this.hostname}:${this.port}/${path}`;
  }

  public addParameter(key: string, value: string): void {
    this.parameters = this.parameters.set(key, value);
  }

  public addOptions(parameters?: HttpParams) {
    if (parameters) {
      return {
        params: parameters,
      };
    }

    return {};
  }

  public getAll(): any {
    return this.http.get<T>(this.fullUrl, this.addOptions(this.parameters));
  }

  public getById(id: number): any {
    return this.http.get<T>(`${this.fullUrl}/${id}`);
  }

  public create(data: T) {
    return this.http.post<T>(this.fullUrl, data);
  }

  public update(data: T, id: number | string) {
    return this.http.put(`${this.fullUrl}/${id}`, data);
  }

  public delete(id: number | string) {
    return this.http.delete(`${this.fullUrl}/${id}`);
  }
}
