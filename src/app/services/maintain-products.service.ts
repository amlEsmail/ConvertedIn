import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductListModel} from '../models/product-list.model';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MaintainProductsService {
  ProductListUpdated: EventEmitter <ProductModel[]> = new EventEmitter();
  CartUpdated: EventEmitter <ProductModel[]> = new EventEmitter();
  cardProduct: ProductModel[] = [];
  AllProducts: ProductModel[] = [];
  pageList: EventEmitter <string[]> = new EventEmitter();
  // private AllProducts = new BehaviorSubject<ProductModel[]>([]);
  brands = [
    {name: 'Samsung', qty: 0, checked: false},
    {name: 'Sony', qty: 0, checked: false},
    {name: 'Xiaomi', qty: 0, checked: false},
    {name: 'Apple', qty: 0, checked: false},
    {name: 'Canon', qty: 0, checked: false},
    {name: 'HUAWEI', qty: 0, checked: false},
    {name: 'HP', qty: 0, checked: false},
    {name: 'Lenovo', qty: 0, checked: false},
  ];
  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<ProductListModel> {
    const api = 'https://dummyjson.com/products?limit=100';
    return this.httpClient.get<ProductListModel>(api);

  }
  getProductByPage(limit, skip): Observable<ProductListModel>{
    const api = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    return this.httpClient.get<ProductListModel>(api);
  }
  getProductDetails(id): Observable<ProductModel>{
    const api = 'https://dummyjson.com/products/' + id;
    return this.httpClient.get<ProductModel>(api);
  }
  getCategoriesList(): Observable<any>{
    const api = 'https://dummyjson.com/products/categories' ;
    return this.httpClient.get(api);
  }
  getProductByCategory(category): Observable <ProductListModel>{
    const api = 'https://dummyjson.com/products/category/' + category;
    return this.httpClient.get<ProductListModel>(api);
  }

  getProductByKeyWord(searchKey): Observable <ProductListModel>{
    const api = `https://dummyjson.com/products/search?q=${searchKey}`;
    return this.httpClient.get<ProductListModel>(api);
  }
}
