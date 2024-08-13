
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoLookupFilteredItemsParams, PoLookupResponseApi } from '@po-ui/ng-components';
import { map, Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public endpointProd = `${environment.url}/api/cdp/v1/product`;


  constructor(private httpClient: HttpClient) { }

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
     //return this.httpClient.get<any>(this.endpointProd + `/?product=${params.filter}&page=${params.page}&pageSize=${params.pageSize}`,  {headers});
      return this.httpClient.get<any>(this.endpointProd + `/?product=${params.filter}&page=${params.page}&pageSize=100`,  {headers})
      
    }
    else {
       //return this.httpClient.get<any>(this.endpointProd + `/?page=${params.page}&pageSize=${params.pageSize}`,  {headers});
       return this.httpClient.get<any>(this.endpointProd + `/?page=${params.page}&pageSize=100`,  {headers})
      }
  }

  getObjectByValue(value: string): Observable<any> {
    /*
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset-utf-8',
      'Authorization': 'Basic ' + btoa("super:super")})
    */
    const headers = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

        return this.httpClient.get<any>(`${this.endpointProd}/?product=${value}`, {headers})
          .pipe(
            tap((response: { results: Array<any> }) => response.results[0])
          );
        //.pipe(tap((e:any)=>{return e.items[0]}))
    
  }

}
