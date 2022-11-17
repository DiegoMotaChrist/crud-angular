import { ProductsService } from "../services/products.service";
import { ProductModel } from "../models/product.model";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ProductsProvider {
  constructor(
    private productService: ProductsService,
    private router: Router) {}

  public async insertProduct(product: ProductModel): Promise<ProductModel> {
    const successNewProduct: string = `Produto ${product.id}: ${product.name} criado.`;
    const errorNewProduct: string = "Falha ao criar novo produto: ";
    const errorFiels: string = "Preencha os campos corretamente. ";

    if (product.price && product.name){
      return await new Promise<ProductModel>(() => {
        this.productService.create(product).subscribe(
          () => {
            this.productService.showMessage(successNewProduct);
            this.router.navigate(['products']);
          },
          (error) => {
            this.productService.showMessage(errorNewProduct + error);
          }
        );
      });
    }else{
      this.productService.showMessage(errorFiels);
    }
    
  }

  public async loadProducts(): Promise<ProductModel[]> {
    const errorLoadProducts: string = "Falha ao carregar Lista de Produtos: ";

    return await new Promise((resolve) => {
      this.productService.read().subscribe(
        (products: ProductModel[]) => {
          resolve(products);
        },
        (error) => {
          this.productService.showMessage(errorLoadProducts + error);
          this.router.navigate(['']);
        }
      );
    });
  }

  public async alterProduct(product: ProductModel): Promise<ProductModel> {
    const successUploadProduct: string = `Produto ${product.id}: ${product.name} atualizado.`;
    const errorUploadProduct: string = `Falha ao atualizar Produto ${product.id}: ${product.name} - `;

    return await new Promise(async (resolve) => {
        this.productService.upload(product).subscribe(
          (product: ProductModel) => {
            if (product) 
            this.productService.showMessage(successUploadProduct);
            resolve(product);
            this.router.navigate(['products']);
          },
          (error) => {
            this.productService.showMessage(errorUploadProduct + error);
            this.router.navigate(['products']);
          }
        );
    });
  }

  public async loadById(id: number): Promise<ProductModel> {
    const successLoadProduct: string = `Produto ${id} carregado.`;
    const errorLoadProduct: string = "Id do Produto não encontrado.";

    return await new Promise((resolve) => {
      this.productService.readById(id).subscribe(
        (product: ProductModel) => {
          resolve(product);
          this.productService.showMessage(successLoadProduct);
        },
        (error) => {
          this.productService.showMessage(errorLoadProduct);
          this.router.navigate(['products']);
        }
      );
    });
  }

  public async loadParams(route: ActivatedRoute): Promise<number> {
    const errorParams: string = "O endereço não possui o parâmetro especificado";
    return await new Promise((resolve) => {
      route.params.subscribe(
        (params) => {
          resolve(params["id"]);
        },
        (error) => {
          this.productService.showMessage(errorParams);
          this.router.navigate(['products']);
        }
      );
    });
  }

  public async getProductIfExists(route :ActivatedRoute): Promise<ProductModel>{
    return await new Promise(async (resolve)=>{
      const idParams: number = await this.loadParams(route).then((id: number) => {
        return id;
      }); 
      
      const product: ProductModel = await this.loadById(idParams).then((product: ProductModel) => {
        return product;
      });

      resolve(product)
    });
  }

  public async deleteProduct(product: ProductModel): Promise<any>{
    const successDeleteProduct: string = `Produto ${product.id}: ${product.name} deletado.`;
    const errorDeleteProduct: string = "Falha ao deletar Produto: ";

    return await new Promise(()=>{
      this.productService.delete(product).subscribe(()=>{
        this.productService.showMessage(successDeleteProduct);
        
      }, error =>{
        this.productService.showMessage(errorDeleteProduct + error);
      });
    })
  }
}
