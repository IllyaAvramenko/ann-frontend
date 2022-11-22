import axios from 'axios';
import { IOrder, OrderCreateType } from '../types/Order.interface';
import { IProduct } from '../types/Product.interface';
import { GetPathsResponseType, IGetProductsQueryParams, ResWithPagination } from './api.types';


const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN + '/api';

export class ApiClass {
   getPaths = async (): Promise<GetPathsResponseType> => {
      const { data } = await axios.get<GetPathsResponseType>(`${BASE_URL}/categories/get/paths`);
      return data;
   };

   getProducts = async (categoryName: string, queryParams: IGetProductsQueryParams = {}) => {

      let queryStr = '';

      if (Object.keys(queryParams).length !== 0) {
         for (const [key, value] of Object.entries(queryParams)) {
            queryStr = `${queryStr}&${key}=${value}`;
         }
      }
      queryStr = queryStr.slice(1);
      
      if (!categoryName) {
         categoryName = 'ALL';
      }

      const products = await axios.get<ResWithPagination<IProduct>>(`${BASE_URL}/products/get/all/${categoryName}?${queryStr}`);

      return products;
   };

   getGenres = async (categoryName: string): Promise<string[]> => {
      if (!categoryName) {
         categoryName = 'ALL';
      }

      const { data: { genres } } = await axios.get<{ genres: string[] }>(`${BASE_URL}/products/get/genres/${categoryName}`);

      return genres;
   };

   getProductBySlug = async (slug: string) => {
      const product = await axios.get<IProduct>(`${BASE_URL}/products/getBySlug/${slug}`);

      return product;
   };

   getProductsBySlugs = async (slugs: string[]) => {
      const { data } = await axios.post<IProduct[]>(`${BASE_URL}/products/get/slugs`, {
         slugs
      });

      return data;
   };
   
   createOrder = async (body: OrderCreateType): Promise<IOrder> => {
      const { data } = await axios.post(`${BASE_URL}/orders/create`, body);

      return data;
   };
}