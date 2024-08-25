import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ProductType} from "../../../types/product.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productName: string | undefined;
  private products: ProductType[] = [];

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea')
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea`, {
      params: {
        id: id.toString()
      }
    });
  }

  setProductName(name: string): void {
    this.productName = name;
  }

  getProductName(): string | undefined {
    return this.productName;
  }

}
