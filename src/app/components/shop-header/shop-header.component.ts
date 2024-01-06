import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MaintainProductsService} from '../../services/maintain-products.service';
import {ProductListModel} from '../../models/product-list.model';
import {ProductModel} from '../../models/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.css']
})
export class ShopHeaderComponent implements OnInit {
@ViewChild('form') form: NgForm;
  searchkey = '';

  cartProductList: ProductModel[] = [];
  constructor(private maintainPrdSrv: MaintainProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.maintainPrdSrv.CartUpdated.subscribe((productList) => {
      this.cartProductList = productList;
    });
  }
  searchProduct(): void{

    if (this.searchkey && this.searchkey !== '') {
      this.maintainPrdSrv.getProductByKeyWord(this.searchkey).subscribe((productList: ProductListModel) => {
        this.maintainPrdSrv.ProductListUpdated.emit( productList.products );
      });
    }else{
      this.maintainPrdSrv.ProductListUpdated.emit(this.maintainPrdSrv.AllProducts);
    }

  }
  navigateToHome(): void {
    if (this.router.url !== ''){
      this.router.navigate(['']);
      this.maintainPrdSrv.pageList.emit(['Home']);
    }

  }

  removeItemFromCart(productId): void{
    this.maintainPrdSrv.cardProduct =  this.maintainPrdSrv.cardProduct.filter(e => e.id !== productId);
    this.maintainPrdSrv.CartUpdated.emit(this.maintainPrdSrv.cardProduct);

  }
}
