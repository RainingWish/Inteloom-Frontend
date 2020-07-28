import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShopComponent } from './shop/shop.component';
import { CarComponent } from './car/car.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'car', component: CarComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
