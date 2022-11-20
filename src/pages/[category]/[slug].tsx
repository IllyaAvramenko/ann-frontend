/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import { ApiClass } from '../../api/api';
import { Button } from '../../components/Button/Button';
import { Htag } from '../../components/HTag/Htag';
import { ArtSlider } from '../../components/sliders/ProductSlider/ProductSlider';
import { addProductToCart } from '../../context/cart/cart.actions';
import { useCart } from '../../context/cart/cart.context';
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
                        >Add to cart</Button>
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
   console.log(isPathExist);

   if (!isPathExist) return { notFound: true };

   try {
      const { data } = await api.getProductBySlug(slug);
      const product: IProduct = {
               _id: "6314c2c7ae497abd7f395b45",
               title: "Roses",
               description: "Beautiful roses from the princess's garden",
               price: 400,
               size: "20/40",
               material: "Oil",
               // @ts-ignore
               genre: "LANDSCAPE",
               categoryId: "62b1c005ca363c0e435e0848",
               // @ts-ignore
               createdAt: "2022-09-04T15:22:47.134Z",
               // @ts-ignore
               updatedAt: "2022-09-04T15:26:06.515Z",
               slug: "roses_a619ua",
               sold: false,
               images: [
                  "/images/d02b4bbbcfdbd2cb21da0ee84f2abf06",
                  "/images/8a4488fb7e6bbd79bd7c0edf5d23f1a9",
                  "/images/616884efc043c1d7de608e35f9b72315",
                  "/images/d6b16d34416d74630e9caab7a8588af6"
                  ]
         };

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