import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProductModel {
    id?: number;
    name: string;
    price: number
}