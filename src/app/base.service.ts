import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './common/page/Page';
import { environment } from '../environments/environment';

export class BaseService<T> {
  private hostname = environment.apiUrl ?? 'http://localhost:8080';
  protected fullUrl = '';
  protected headers = new HttpHeaders();
  public parameters: HttpParams = new HttpParams();

  constructor(protected http: HttpClient, path: string) {
    this.fullUrl = `${this.hostname}/${path}`;
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

  public getAll(): Observable<Page<T>> {
    return this.http.get<Page<T>>(
      this.fullUrl,
      this.addOptions(this.parameters)
    );
  }

  public getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.fullUrl}/${id}`);
  }

  public create(data: T): Observable<T> {
    return this.http.post<T>(this.fullUrl, data);
  }

  public update(data: T, id: number | string): Observable<T> {
    return this.http.put<T>(`${this.fullUrl}/${id}`, data);
  }

  public delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.fullUrl}/${id}`);
  }
}
