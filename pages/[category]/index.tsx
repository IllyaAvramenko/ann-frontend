/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, SyntheticEvent } from 'react';
import { ApiClass } from '../../api/api';
import { ResWithPagination, SortEnum } from '../../api/api.types';
import Pagination from '../../components/Pagination/Pagination';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { Select } from '../../components/Select/Select';
import { Title } from '../../components/Title/Title';
import { withLayout } from '../../layout/Layout';
import s from '../../styles/Shop.module.css';
import { IProduct } from '../../types/Product.interface';

const SORT_BY_OPTIONS = [
   { value: 'title-asc', text: 'Title asc' },
   { value: 'title-desc', text: 'Title desc' },
   { value: 'price-asc', text: 'Price asc' },
   { value: 'price-desc', text: 'Price desc' },
   { value: 'createdAt-asc', text: 'First new' },
   { value: 'createdAt-desc', text: 'First old' }
];

const BROWSE_BY_GENRE = [
   { value: 'ALL', text: 'All' },
   { value: 'PROTRAIT', text: 'Portrait' },
   { value: 'STILL_LIFE', text: 'Still life' },
   { value: 'LANDSCAPE', text: 'Landscape' },
   { value: 'ANIMALISTICS', text: 'Animalistics' },
   { value: 'RELIGIOUS', text: 'Religious' },
   { value: 'BATTLE', text: 'Battle' },
   { value: 'HOUSEHOLD', text: 'Household' },
   { value: 'HISTORICAL', text: 'Historycal' },
   { value: 'MYTHOLOGICAL', text: 'Mythological' },
   { value: 'MARINE_STUDIES', text: 'Marine studies' },
   { value: 'SELF_PORTRAIT', text: 'Self portrait' },
   { value: 'ARCHITECTURE', text: 'Architecture' },
];

const Shop: FC<IProps> = ({ products, category, query }) => {
   const router = useRouter();

   const setPaginationHandler = (page: string | number) => {
      router.replace({
         query: { ...router.query, page: Number(page) - 1 }
      });
   };

   const onSelectChangeHandler = (e: SyntheticEvent<HTMLSelectElement>) => {
      // @ts-ignore
      const value: string = e.target.value;
      // @ts-ignore
      const name: string = e.target.name;

      router.replace({
         query: { 
            ...router.query, 
            [name]: value,
            page: 0
         }
      });
   };


   return (
      <div className={s.body}>
         <div className={s.header}>
            <Title>Arts</Title>
            <div className={s.filters}>
               <label htmlFor="BrowseBy">Browse by genre</label>
               <Select 
                  onChange={(e) => onSelectChangeHandler(e)}
                  defaultValue={query?.genre || 'ALL'}
                  name='genre'
               >
                  {BROWSE_BY_GENRE.map(option => (
                     <option value={option.value}>{option.text}</option>
                  ))}
               </Select>
               <label htmlFor="BrowseBy">Sort by</label>
               <Select 
                  onChange={(e) => onSelectChangeHandler(e)}
                  defaultValue={query?.sortBy || 'createdAt-asc'}
                  name='sortBy'
               >
                  {SORT_BY_OPTIONS.map(option => (
                     <option value={option.value}>{option.text}</option>
                  ))}
               </Select>
            </div>
         </div>
         <div className={s.products}>
            {products.items.map(product => (
               <ProductItem 
                  key={product._id}
                  title={product.title}
                  url={`/${category}/${product.slug}`}
                  description={product.description} 
                  price={product.price} 
                  img='https://via.placeholder.com/1000' />
            ))}
         </div>
         <Pagination
            className={s.pag}
            currentPage={(Number(query?.page) + 1) || 0}
            pageSize={products.limit}
            totalCount={products.total}
            onPageChange={page => setPaginationHandler(page)}
         />
      </div>
   );
};

export default withLayout(Shop);

interface IQuery extends ParsedUrlQuery {
   sortBy?: SortEnum
   page?: string
   limit?: string
   genre?: string
   search?: string
   category: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   if (!context.params) return { notFound: true };

   const { category, ...restQuery } = context.query as IQuery;

   const api = new ApiClass();
   const { data } = await api.getProducts(category, restQuery);

   try {
      return {
         props: {
            products: data,
            category,
            query: context.query
         }
      };
   } catch (e) {
      return { notFound: true };
   }
};

interface IProps extends Record<string, unknown> {
   products: ResWithPagination<IProduct>
   category: string
   query?: IQuery
}