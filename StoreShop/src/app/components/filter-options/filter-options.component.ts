import { Component, OnInit } from '@angular/core';
import {MaintainProductsService} from '../../services/maintain-products.service';
import {ProductListModel} from '../../models/product-list.model';
import {ProductModel} from '../../models/product.model';
import * as _ from 'lodash';
@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss']
})
export class FilterOptionsComponent implements OnInit {
  Categories = [];
  Products: ProductModel[] = [];
  Brands: any [] = [];
  filterbrands = [];
  filteredProduct = [];
  constructor(private maintainProductSrv: MaintainProductsService) { }

  ngOnInit(): void {
    this.Brands = this.maintainProductSrv.brands;
   this.maintainProductSrv.getCategoriesList().subscribe((categories) => {
     this.Categories = categories;
   });
  }

  filterProductByCategory(category): void{
    this.maintainProductSrv.getProductByCategory(category).subscribe((productList: ProductListModel) =>  {
      this.maintainProductSrv.ProductListUpdated.emit(productList.products);
      this.maintainProductSrv.pageList.emit(['home', category]);
      console.log(this.Products);
    });
  }

  filterProductByBrand(brandName, checkBox: HTMLInputElement, index: number): void{

    this.maintainProductSrv.brands[index].checked = checkBox.checked;
    if (this.maintainProductSrv.brands[index].checked){
      this.filterbrands.push(brandName);
    }else{
      this.filterbrands =  this.filterbrands.filter(e => e !== brandName);
   }
    if (this.filterbrands.length > 0){
      this.filteredProduct  = _.filter(this.maintainProductSrv.AllProducts, (product)  => {
        return this.filterbrands.indexOf(product.brand) !== -1 ;
      });
      this.maintainProductSrv.ProductListUpdated.emit(this.filteredProduct);
      this.maintainProductSrv.pageList.emit(['home', brandName]);
    }else{
      this.maintainProductSrv.ProductListUpdated.emit(this.maintainProductSrv.AllProducts);
      this.maintainProductSrv.pageList.emit(['home']);
    }

  }

}
