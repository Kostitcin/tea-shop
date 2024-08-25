import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";


@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router) {
  }

  products: ProductType[] = [];

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          }, error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        })
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/collections', productId]);
  }
}
