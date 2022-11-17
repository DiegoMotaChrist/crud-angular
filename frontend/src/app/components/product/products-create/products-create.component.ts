import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsProvider } from "../../../providers/products.provider";
import { ProductInterface } from "../../../models/product.interface";
import { ProductModel } from "../../../models/product.model";

@Component({
  selector: "app-products-create",
  templateUrl: `products-create.component.html`,
  styleUrls: [`products-create.component.css`],
})

export class ProductsCreateComponent implements OnInit, ProductInterface {

  prefixProducts: string = '/products'

  constructor(
    private productsProvider: ProductsProvider,
    private router: Router,
    public product: ProductModel 
  ) {
  }

  ngOnInit(): void {}

  public createProduct(): void {
    try {
      this.productsProvider.insertProduct(this.product);
      
    } catch (error) {
      console.log(error);
    }
  }

  public cancel() {
    this.router.navigate([this.prefixProducts]);
  }
}
