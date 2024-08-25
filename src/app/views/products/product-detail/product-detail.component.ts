import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { ProductType } from '../../../../types/product.type';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductType | undefined;
  error: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id) || id <= 0) {
      this.error = 'Неверный ID товара';
      return;
    }

    this.productService.getProduct(id).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.error = 'Неожиданный формат ответа';
        } else {
          this.product = data;
        }
      },
      error: (error) => {
        console.error(error);
        this.error = 'Не удалось загрузить данные о товаре. Попробуйте позже.';
      }
    });
  }

  buyProduct(): void {
    if (this.product) {
      this.productService.setProductName(this.product.title);
      localStorage.setItem('productName', this.product.title);
      this.router.navigate(['/order']);
    }
  }

}
