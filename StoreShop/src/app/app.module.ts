import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopHeaderComponent } from './components/shop-header/shop-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FilterOptionsComponent } from './components/filter-options/filter-options.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { HomeComponent } from './components/home/home.component';
import { BreadCreambComponent } from './components/bread-creamb/bread-creamb.component';
import {ApiCacheInterceptor} from './interceptors/api-cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ShopHeaderComponent,
    ProductListComponent,
    FilterOptionsComponent,
    SingleProductComponent,
    HomeComponent,
    BreadCreambComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiCacheInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
