import axios from 'axios';
import { IProduct } from '../types/Product.interface';
import { GetPathsResponseType, IGetProductsQueryParams, ResWithPagination } from './api.types';


const BASE_URL = 'http://localhost:5000/api';

export class ApiClass {
   getPaths = async (): Promise<GetPathsResponseType> => {
      const paths = await axios.get<GetPathsResponseType>(`${BASE_URL}/categories/get/paths`).then(res => res.data);
      return paths;
   };

   getProducts = async (categoryName: string, queryParams: IGetProductsQueryParams = {}) => {

      let queryStr = '';

      if (Object.keys(queryParams).length !== 0) {
         for (const [key, value] of Object.entries(queryParams)) {
            queryStr = `${queryStr}&${key}=${value}`;
         }
      }
      queryStr = queryStr.slice(1);
      console.log(queryStr);
      const products = await axios.get<ResWithPagination<IProduct>>(`${BASE_URL}/products/get/all/${categoryName}?${queryStr}`);

      return products;
   };

   getProductBySlug = async (slug: string) => {
      const product = await axios.get<IProduct>(`${BASE_URL}/products/getBySlug/${slug}`);

      return product;
   };

   getProductsBySlugs = async (slugs: string[]) => {
      const products = await axios.post<IProduct[]>(`${BASE_URL}/products/get/slugs`, {
         slugs
      }).then(res => res.data);

      return products;
   };
}