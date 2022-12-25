/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import { ApiClass } from '../../api/api';
import { Button, Htag } from '../../components';
import { ArtSlider } from '../../components/sliders';
import { addProductToCart, useCart } from '../../context/cart';
import { withLayout } from '../../layout/Layout';
import s from '../../styles/Art.module.css';
import { IProduct } from '../../types/Product.interface';

const Product: FC<IProps> = ({ product }) => {
   const router = useRouter();

   const { dispatch } = useCart();

   const addToCartHandler = () => {
      dispatch(addProductToCart(product.slug, router));
      router.push('/cart');
   };
   
   return (
      <>
         {product && (
            <div className={s.body}>
               <div className={s.slider}>
                  <ArtSlider images={product?.images ? product.images.map(img => `${process.env.NEXT_PUBLIC_DOMAIN}/api/products${img}`) : []} />
               </div>
               <div className={s.content}>
                  <Htag tag='h4' className={s.subTitle}>Anna Budzinska Art Shop</Htag>
                  <Htag tag='h1' className={s.title}>{product.title}</Htag>
                  <div className={s.offers}>
                     <div className={s.price}>
                        <p>€ {product.price}.00</p>
                     </div>
                     <div className={s.description}>
                        <p>{product.description}</p>
                     </div>
                     <div className={s.buyButton}>
                        <Button
                           onClick={addToCartHandler}
                           appearance='secondary'
                           size='l'
                        >
                           Add to cart
                        </Button>
                     </div>
                     <div className={s.chars}>
                        <p>Title - {product.title}</p>
                        <p>Material - {product.material}</p>
                        <p>Size - {product.size}</p>
                     </div>
                  </div>
               </div>
               <div className={s.rec}>
                  Recommendation
               </div>
            </div>
         )}
      </>
   );
};

export default withLayout(Product);

export const getStaticPaths: GetStaticPaths = async () => {
   const api = new ApiClass();
   const res = await api.getPaths();

   const paths = res.paths.flatMap(item => {
      const categoryPaths = item.productsSlugs.map(slug => `/${item.name}/${slug}`);
      return categoryPaths;
   });

   return {
      paths,
      fallback: true
   };
};

interface IParams extends ParsedUrlQuery {
   slug: string
}

export const getStaticProps: GetStaticProps<IProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
   if (!params) return { notFound: true };
   const { slug } = params as IParams;
   const api = new ApiClass();
   const res = await api.getPaths();

   const paths = res.paths.flatMap(item => {
      const categoryPaths = item.productsSlugs.map(slug => `/${item.name}/${slug}`);
      return categoryPaths;
   });

   const isPathExist = paths.find(path => path.split('/')[2] === slug);

   if (!isPathExist) return { notFound: true };

   try {
      const { data } = await api.getProductBySlug(slug);
      
      return {
         props: {
            product: data
         },
         notFound: false
      };
   } catch (e) {
      return { notFound: true };
   }
};

interface IProps extends Record<string, unknown> {
   product: IProduct
}