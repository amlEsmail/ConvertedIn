import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MaintainProductsService} from '../../services/maintain-products.service';
import {ProductModel} from '../../models/product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  productImages: string[] = [];
  Product: ProductModel = new ProductModel();
  productImageSrc = '';
  warningFlg = false;
  constructor(private route: ActivatedRoute,
              private maintainProduct: MaintainProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.Product.id = param['id'];
      this.maintainProduct.getProductDetails(this.Product.id).subscribe((productDetails: ProductModel) => {
        this.Product = productDetails ;
        this.productImages = this.Product.images;
        this.productImageSrc = this.Product.thumbnail ? this.Product.thumbnail : this.productImages[0];
        this.maintainProduct.pageList.emit(['Home', this.Product.category, this.Product.title]);
      });
    });
  }

  changeImage(imgsrc): void{
    this.productImageSrc = imgsrc;
  }

  addToCart(): void{
    const duplicatedPrd = this.maintainProduct.cardProduct.filter((e => e.id === this.Product.id));
    if (duplicatedPrd && duplicatedPrd.length > 0 ){
      this.warningFlg = true;
    }else{
      this.warningFlg = false;
      this.maintainProduct.cardProduct.push(this.Product);
      this.maintainProduct.CartUpdated.emit( this.maintainProduct.cardProduct);
    }

  }
}
