import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { ProductsProvider } from 'src/app/providers/products.provider';
import { ProductInterface } from 'src/app/models/product.interface';

@Component({
  selector: 'app-products-read',
  templateUrl: `products-read.component.html`,
  styleUrls: [`products-read.component.css`]
})
export class ProductsReadComponent implements OnInit {

  private idColumn: string = 'id';
  private nameColumn: string = 'name';
  private priceColumn: string = 'price';
  private actionColumn: string = 'action';

  public products: ProductModel[] = new Array();
  public displayedColumns: string[] = [this.idColumn, this.nameColumn, this.priceColumn, this.actionColumn];

  constructor(
    private productsProvider: ProductsProvider
  ) { }

  async ngOnInit() {
    this.products = await this.productsProvider.loadProducts();
  }

  public async removeProduct(product: ProductModel){
    try {
      this.productsProvider.deleteProduct(product);
      this.products = await this.productsProvider.loadProducts();

    } catch (error) {
      console.log(error);
    }
  }
}
