import { Component, OnInit } from '@angular/core';

import { ProductsProvider } from 'src/app/providers/products.provider';
import { ProductModel } from 'src/app/models/product.model';
import { ProductInterface } from 'src/app/models/product.interface';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-update',
  templateUrl: `products-update.component.html`,
  styleUrls: [`products-update.component.css`]
})
export class ProductsUpdateComponent implements OnInit, ProductInterface {

  prefixProducts: string = '/products'

  constructor(
    private productsProvider: ProductsProvider,
    public product: ProductModel,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.product = await this.productsProvider.getProductIfExists(this.route);
  }

  public updateProduct(){
    try {
      this.productsProvider.alterProduct(this.product);
    } catch (error) {
      console.log(error);
    } 
  }

  cancel(){
    this.router.navigate([this.prefixProducts]);
  }
}
