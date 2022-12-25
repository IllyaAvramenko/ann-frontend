import { useRouter } from 'next/router';
import { Button, CartProduct, P, Title } from '../components';
import { removeProductFromCart, useCart } from '../context/cart';
import { withCart } from '../HOCs';
import { withLayout } from '../layout/Layout';
import s from '../styles/Basket.module.css';

const Cart = () => {
   const router = useRouter();

   const { state: { products }, dispatch } = useCart();


   const removeFromCart = async (slug: string) => {
      dispatch(removeProductFromCart(slug));
   };

   const onCheckout = () => {
      router.push('/order');
   };

   return (
      <div className={s.body}>
         <div className={s.header}>
            <Title>Your Cart</Title>
         </div>
         <div className={s.products}>
            <div className={s.productsHeader}>
               <div style={{ display: 'grid', justifyItems: 'start' }}>
                  <P size='l'><strong>Arts</strong></P>
               </div>
               <div className={s.subHeaders}>
                  <P size='l'><strong>Price</strong></P>
               </div>
            </div>
            <div className={s.productsWrapper}>
               {products.data.map(({ _id, slug, title, price, category, images }) => (
                  <CartProduct
                     key={_id}
                     slug={slug}
                     title={title}
                     img={images ? `${process.env.NEXT_PUBLIC_DOMAIN}/api/products${images[0]}` : ''}
                     price={price}
                     onRemove={removeFromCart}
                     url={`/${category.name}/${slug}`}
                  />
               ))}
            </div>
         </div>
         <div className={s.info}>
            <div className={s.total}>
               <P>Total: <strong>€{products.data.reduce((prev, curr) => prev + curr.price, 0)},00</strong></P>
            </div>
            <div className={s.buttons}>
               <Button 
                  appearance='secondary' 
                  size='l'
                  onClick={() => router.push('/paintings')}   
               >
                  Continue shopping
               </Button>
               <Button
                  disabled={products.isLoading || products.data.length <= 0}
                  onClick={onCheckout}
               >
                  Check out
               </Button>
            </div>
         </div>
      </div>
   );
};

export default withLayout(withCart(Cart));