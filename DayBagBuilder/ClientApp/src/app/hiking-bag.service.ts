import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BagItem } from './HikingBag';

@Injectable({
  providedIn: 'root'
})
export class HikingBagService {
  urlRoot: String; 


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.urlRoot = baseUrl;
  }

  ShowAllBagItems(): Observable <BagItem[]> {
    return this.http.get<BagItem[]>(this.urlRoot + "bagitem/ShowAllBagItems");
  }

  searchBagItemsById(id: number): Observable <BagItem>{
    return this.http.get<BagItem>(this.urlRoot + "bagitem/ShowAllBagItems");
  }

  createBagItem(b: BagItem): Observable <BagItem>{
    return this.http.put<BagItem>(this.urlRoot + "bagitem/CreateNewBagItem" , b,);
  }

  deleteBagItem(id: number): Observable<BagItem> {
    return this.http.delete<BagItem>(this.urlRoot + "bagitem/DeleteBagItem/" + id);
  }

  updateTicket(id: number, b: BagItem): Observable<BagItem> {
    return this.http.post<BagItem>(this.urlRoot + "ticket/UpdateBagItem/" + id, b);
  }
}
