import { Injectable, OnInit } from '@angular/core';
import { ShopDataService } from './shop-data.service';
import { HttpClient } from '@angular/common/http';

export class CarList {
  constructor(
    public id: number,
    public productName: string,
    public productDesc: string,
    public imgAddr: string,
    public price: number,
    public stock: number,
    public incar: number,
    public total: number,
    public disabled: boolean
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class CarDataService implements OnInit {

  carList: Array<CarList> = new Array();

  Total = 0;

  count = 0;

  length = 0;

  constructor(
    private shopService: ShopDataService,
    private http: HttpClient
  ) { }

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  initCarList() {
    this.shopService.getAllList().subscribe(
      response => {
        response.forEach(element => {
          let check = false;
          if (element.stock <= 0) {
            check = true;
          }
          const currentItem = new CarList(element.id,
            element.productName,
            element.productDesc,
            element.imgAddr,
            element.price,
            element.stock,
            0,
            0,
            check);
          this.carList.push(currentItem);
          this.length = this.length + 1;
        });
      });
  }

  // tslint:disable-next-line:typedef
  addTotal(price) {
    this.Total = this.Total + price;
  }

  // tslint:disable-next-line:typedef
  reduceTotal(price) {
    this.Total = this.Total - price;
  }

   // tslint:disable-next-line:typedef
   updateList(id, incar) {
    return this.http.put(`http://localhost:8080/users/shoppinglist/${id}/${incar}`, null );
  }

   // tslint:disable-next-line:typedef
   sendEmail(email) {
    return this.http.put(`http://localhost:8080/users/shoppinglist/user/email/${email}`, null );
  }

}
