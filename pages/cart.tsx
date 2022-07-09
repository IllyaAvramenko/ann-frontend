import { useEffect } from 'react';
import { Button } from '../components/Button/Button';
import { CartProduct } from '../components/CartProduct/CartProduct';
import { P } from '../components/P/P';
import { Title } from '../components/Title/Title';
import { fetchCartProducts, removeProductFromCart } from '../context/cart/cart.actions';
import { useCart } from '../context/cart/cart.context';
import { withLayout } from '../layout/Layout';
import s from '../styles/Basket.module.css';

const Cart = () => {

   const { state, dispatch } = useCart();

   useEffect(() => {
      dispatch(fetchCartProducts());
   }, []);

   const removeFromCart = async (slug: string) => {
      dispatch(removeProductFromCart(slug));
   };

   return (
      <div className={s.body}>
         <div className={s.header}>
            <Title>Your Cart</Title>
         </div>
         <div className={s.products}>
            <div className={s.productsHeader}>
               <div></div>
               <div className={s.subHeaders}>
                  <P size='l'><strong>Price</strong></P>
               </div>
            </div>
            <div className={s.productsWrapper}>
               {state.products.map(product => (
                  <CartProduct
                     key={product._id}
                     slug={product.slug}
                     title={product.title}
                     img={'https://via.placeholder.com/1000'}
                     price={product.price}
                     onRemove={removeFromCart}
                  />
               ))}
            </div>
         </div>
         <div className={s.info}>
            <div className={s.total}>
               <P>Total: <strong>€400,00</strong></P>
            </div>
            <div className={s.buttons}>
               <Button>
                  Check out
               </Button>
            </div>
         </div>
      </div>
   );
};

export default withLayout(Cart);