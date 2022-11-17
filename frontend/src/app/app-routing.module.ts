import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeView } from './views/home/home.view';

import { ProductsComponent } from './views/products/products.component';
import { ProductsCreateComponent } from './components/product/products-create/products-create.component';
import { ProductsUpdateComponent } from './components/product/products-update/products-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeView
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/create',
    component: ProductsCreateComponent
  },

  {
    path: 'products/update/:id',
    component: ProductsUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
