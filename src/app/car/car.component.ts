import { Component, OnInit } from '@angular/core';
import { CarDataService } from '../service/data/car-data.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(
    private carService: CarDataService,
    private formBuilder: FormBuilder,
  ) { }

  // tslint:disable-next-line:typedef
  get f() { return this.registerForm.controls; }

  items = this.carService.carList;

  Total = this.carService.Total;

  registerForm: FormGroup;

  submitted = false;

  emailAddr: string;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  // tslint:disable-next-line:typedef
  addItem(id) {
    this.carService.carList[id - 1].stock = this.carService.carList[id - 1].stock - 1;
    this.carService.carList[id - 1].incar = this.carService.carList[id - 1].incar + 1;
    this.carService.carList[id - 1].total = this.carService.carList[id - 1].total + this.carService.carList[id - 1].price;
    this.carService.addTotal(this.carService.carList[id - 1].price);
    this.updateTotal();
    if (this.carService.carList[id - 1].stock === 0) {
      this.carService.carList[id - 1].disabled = true;
    }
  }

  // tslint:disable-next-line:typedef
  removeItem(id) {
    this.carService.carList[id - 1].stock = this.carService.carList[id - 1].stock + 1;
    this.carService.carList[id - 1].incar = this.carService.carList[id - 1].incar - 1;
    this.carService.carList[id - 1].total = this.carService.carList[id - 1].total - this.carService.carList[id - 1].price;
    this.carService.reduceTotal(this.carService.carList[id - 1].price);
    this.updateTotal();
    if (this.carService.carList[id - 1].stock > 0) {
      this.carService.carList[id - 1].disabled = false;
    }
  }

  // tslint:disable-next-line:typedef
  updateTotal() {
    this.Total = this.carService.Total;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.carService.sendEmail(this.emailAddr).subscribe(() => { });

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

  }

  // tslint:disable-next-line:typedef
  submit() {
    const currentId = this.carService.carList[this.carService.length - 1].id;
    const currentIncar = this.carService.carList[this.carService.length - 1].incar;
    this.carService.updateList(currentId, currentIncar).subscribe(
      () => {
        if (this.carService.length > 1) {
          this.carService.length = this.carService.length - 1;
          this.submit();
        }
      }
    );
  }
}

