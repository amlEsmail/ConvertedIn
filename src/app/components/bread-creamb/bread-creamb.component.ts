import { Component, OnInit } from '@angular/core';
import {MaintainProductsService} from '../../services/maintain-products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bread-creamb',
  templateUrl: './bread-creamb.component.html',
  styleUrls: ['./bread-creamb.component.scss']
})
export class BreadCreambComponent implements OnInit {
  PageList: string[] = ['home'];
  constructor(private maintainProductSrv: MaintainProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.maintainProductSrv.pageList.subscribe((pages) => {
      this.PageList = pages;
    });

  }
  visitHome(): void{
    this.router.navigate(['']);
    this.maintainProductSrv.pageList.emit(['home']);
    this.maintainProductSrv.ProductListUpdated.emit(this.maintainProductSrv.AllProducts);
  }

}
