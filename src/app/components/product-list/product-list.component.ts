import { Component, OnInit } from '@angular/core';
import {MaintainProductsService} from '../../services/maintain-products.service';
import {ProductListModel} from '../../models/product-list.model';
import {ProductModel} from '../../models/product.model';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  Products: ProductModel [] = [];
  productsByPage: any[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 20;
  constructor(private maintainProductSrv: MaintainProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getDataFromCache();
    this.maintainProductSrv.ProductListUpdated.subscribe((products) => {
      this.Products = products;
      this.collectionSize = this.Products.length;
      this.refreshProductList();
    });
  }


  getBrandQty(products): void {
    _.forEach(this.maintainProductSrv.brands, (brandItem) => {
      brandItem.qty = _.filter(products, { brand : brandItem.name}).length;
    });
  }

  refreshProductList(): void{
    if (this.Products.length > 0) {
      this.productsByPage = this.Products
        .map((product, i) => ({id: i + 1, ...product}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }else{
      this.productsByPage = [];
    }

    // if (this.page === 1 ){
    //   this.skipItems = 0;
    // }else{
    //   this.skipItems = (this.page - 1) * this.pageSize + this.pageSize;
    // }
    // this.maintainProductSrv.getProductByPage(this.pageSize, this.skipItems ).subscribe((productsList) => {
    //   this.productsByPage = productsList.products.map((product, i) => ({id: i + 1, ...product}))
    // });

  }
  showProductDetails(id): void{
    this.router.navigate(['/details', id]);
}


  getDataFromCache(): void {
     const cachedResponse = JSON.parse(localStorage.getItem('Products'));
     if (cachedResponse){
       if (cachedResponse.expireTime <= Date.now()){
         localStorage.removeItem('Products');
         this.getDataFromCache();
       }else{
         this.setProductList(cachedResponse.data);
       }
    }else{
       this.maintainProductSrv.getProductList().subscribe((productList: ProductListModel) =>  {
         const result: any  = {
           data : productList
         };
         result.expireTime =  Date.now() + 15 * 60 * 1000;
         localStorage.setItem('Products', JSON.stringify(result));
         this.setProductList(productList);
       });
    }
  }
  setProductList(productList): void {
    this.maintainProductSrv.AllProducts = productList.products;
    this.collectionSize = productList.total;
    this.Products = productList.products;
    this.refreshProductList();
    // this.maintainProductSrv.ProductListUpdated.emit(productList.products);
    this.getBrandQty(productList.products);
  }
}
