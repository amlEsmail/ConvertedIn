import {ProductModel} from './product.model';

export class ProductListModel {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;

}
