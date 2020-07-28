import { Component, OnInit } from '@angular/core';
import { ShopDataService } from '../service/data/shop-data.service';
import { CarDataService } from '../service/data/car-data.service';

export class ShopList {
  constructor(
    public id: number,
    public productName: string,
    public productDesc: string,
    public imgAddr: string,
    public price: number,
    public stock: number
  ) {
  }
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  item: ShopList[];

  items = this.carService.carList;

  constructor(
    private shopService: ShopDataService,
    private carService: CarDataService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.init();
  }

  // tslint:disable-next-line:typedef
  refresh() {
    this.shopService.getAllList().subscribe(
      response => {
        this.item = response;
      }
    );
  }

  // tslint:disable-next-line:typedef
  init() {
    this.carService.initCarList();

  }

  // tslint:disable-next-line:typedef
  addItem(id) {
    this.carService.carList[id - 1].stock = this.carService.carList[id - 1].stock - 1;
    this.carService.carList[id - 1].incar = this.carService.carList[id - 1].incar + 1;
    this.carService.carList[id - 1].total = this.carService.carList[id - 1].total + this.carService.carList[id - 1].price;
    this.carService.addTotal(this.carService.carList[id - 1].price);
    if (this.carService.carList[id - 1].stock === 0) {
      this.carService.carList[id - 1].disabled = true;
    }
  }

}
