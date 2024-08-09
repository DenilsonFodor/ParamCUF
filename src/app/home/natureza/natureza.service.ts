import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const endpoint = `${environment.url + environment.api}/cufapi102`;

var header = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

@Injectable({
  providedIn: 'root'
})
export class NaturezaService{

  constructor(private httpClient: HttpClient) {}

  public getAll(filtros:any): Observable<any> {
    return this.httpClient.get<any>(endpoint,{headers:header, params:filtros});
  }

  public getRowid(rowid: string): Observable<any> {
    return this.httpClient.get<any>(endpoint + '/' + rowid,{headers:header});
  }

  public addReg(regs: JSON) {Observable<any>
    console.log("zzz " + regs)
    return this.httpClient.post<any>(endpoint, regs, {headers:header});
  }  

  public updReg(regs: JSON) {Observable<any>
    return this.httpClient.put<any>(endpoint, regs, {headers:header});
  }  

  public delReg(rowid: string): Observable<any> {
      return this.httpClient.delete<any>(endpoint + '/' + rowid,{headers:header});
  }






}

