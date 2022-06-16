import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BagSave } from './BagSave';
import { BagItem } from './BagItem';
import { User } from './User';

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

  updateBagItem(id: number, b: BagItem): Observable<BagItem> {
    return this.http.post<BagItem>(this.urlRoot + "ticket/UpdateBagItem/" + id, b);
  }

  showAllUsers(): Observable<User[]>  {
    return this.http.get<User[]>(this.urlRoot + "user/ShowAllUsers");
  }

  GetUserById(id: number): Observable <User>{
    return this.http.get<User>(this.urlRoot + "user/GetUserById/" + id);
  }

  CreateNewUser(u: User): Observable <User>{
    return this.http.put<User>(this.urlRoot + "user/CreateNewUser/", u);
  }

  DeleteUser(id: number){
    return this.http.delete<User>(this.urlRoot + "user/DeleteUser/" + id);
  }

  ShowAllBagSaves(): Observable<BagSave[]>{
    return this.http.get<BagSave[]>(this.urlRoot + "bagsave/ShowAllBagSave");
  }

  CreateBagSave(b: BagSave): Observable<BagSave>{
    return this.http.put<BagSave>(this.urlRoot + "bagsave/CreateBagSave", b);
  }

  DeleteBagSave(id: number){
    return this.http.delete<BagSave>(this.urlRoot + "user/DeleteBagSave/" + id);
  }

}
