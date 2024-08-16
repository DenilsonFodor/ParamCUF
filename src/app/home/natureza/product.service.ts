
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoLookupFilteredItemsParams, PoNotificationService } from '@po-ui/ng-components';
import { catchError, map, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public endpointProd = `${environment.url}/api/cdp/v1/product`;


  constructor(private httpClient: HttpClient,
              private poNotification: PoNotificationService
  ) { }

  getFilteredItems(filteredParams: PoLookupFilteredItemsParams): Observable<any> {
    const { filterParams, advancedFilters, ...restFilteredItemsParams } = filteredParams;
    const params = { ...restFilteredItemsParams, ...filterParams, ...advancedFilters}

    const headers = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

    if (params.filter != "") {
     //return this.httpClient.get<any>(this.endpointProd + `/?product=${params.filter}&page=${params.page}&pageSize=${params.pageSize}`,  {headers});
      return this.httpClient.get<any>(this.endpointProd + `/?product=${params.filter}&page=${params.page}&pageSize=100`,  {headers})
      
    }
    else {
       //return this.httpClient.get<any>(this.endpointProd + `/?page=${params.page}&pageSize=${params.pageSize}`,  {headers});
       return this.httpClient.get<any>(this.endpointProd + `/?page=${params.page}&pageSize=100`, {headers})
      }
  }

  getObjectByValue(value: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

        return this.httpClient.get<any>(`${this.endpointProd}/?product=${value}`, {headers})
         //.pipe(map((e:any)=>{return e.items[0]}))
         //.pipe(map((e:any) => e[0]))
         .pipe(map(response => {
            // Verifica se há itens na resposta
            if (response && response.items && response.items.length > 0) {
              return response.items[0]; // Retorna o primeiro item da lista
            }
            this.poNotification.error(`Item não encontrado`);

            return null; // Retorna null se não houver itens
          }),
          catchError(error => {
            console.error('Erro ao obter objeto pelo valor:', error);
            return of(null); // Retorna null em caso de erro
          })
        );
    
  }

}
