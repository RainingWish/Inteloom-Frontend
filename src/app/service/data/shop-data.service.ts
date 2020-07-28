import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopList } from '../../shop/shop.component';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line:typedef
  getAllList() {
    return this.http.get<ShopList[]>('http://localhost:8080/users/shoppinglist');
  }

}
