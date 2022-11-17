import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: "root"
})

export class ProductsService{

    private readonly baseURL = 'http://localhost:3000/products';
    
    constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient){ }

    public showMessage(msg: string): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    public readById(id: number): Observable<ProductModel>{
        const URLById = `${this.baseURL}/${id}`
        return this.http.get<ProductModel>(URLById);
    }

    public read(): Observable<ProductModel[]>{
        return this.http.get<ProductModel[]>(this.baseURL);
    }

    public create(product: ProductModel): Observable<ProductModel>{
        return this.http.post<ProductModel>(this.baseURL, product);
    } 

    public upload(product: ProductModel): Observable<ProductModel>{
        const URLById = `${this.baseURL}/${product.id}`
        return this.http.put<ProductModel>(URLById, product);
    }
    
    public delete(product: ProductModel): Observable<ProductModel>{
        const URLById = `${this.baseURL}/${product.id}`
        return this.http.delete<ProductModel>(URLById);
    }
}