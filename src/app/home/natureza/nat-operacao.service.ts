
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoLookupFilteredItemsParams } from '@po-ui/ng-components';
import { Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NatOperacaoService {

  public endpointNatur = `${environment.url}/api/cdp/v1/cfgTransactionType`;

  constructor(private HttpClient: HttpClient) { }


  getFilteredItems(filteredParams: PoLookupFilteredItemsParams): Observable<any> {
    const { filterParams, advancedFilters, ...restFilteredItemsParams } = filteredParams;
    const params = { ...restFilteredItemsParams, ...filterParams, ...advancedFilters}
    
    /*
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset-utf-8',
      'Authorization': 'Basic ' + btoa("super:super")})
    */
    const headers = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))
    
    console.log(params)
    if (params.filter != "") {
      return this.HttpClient.get<any>(this.endpointNatur + `/?natOperation=${params.filter}&page=${params.page}&pageSize=50`,  {headers});
      //return this.HttpClient.get<any>(this.endpointNatur + `/?cfopCode=${params.filter}&page=${params.page}&pageSize=${params.pageSize}`,  {headers});
    }
    else {
       return this.HttpClient.get<any>(this.endpointNatur + `/?page=${params.page}&pageSize=50`,  {headers});
    }
  }

  getObjectByValue(value: string): Observable<any> {
    /*
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset-utf-8',
      'Authorization': 'Basic ' + btoa("super:super")})
    */
    const headers = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

        return this.HttpClient.get<any>(`${this.endpointNatur}/?natOperation=${value}`, {headers})
        //.pipe(tap((e:any)=>{return e.items[0]}))
    
  }


}
