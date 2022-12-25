import { FunctionComponent, useEffect } from 'react';
import { fetchCartProducts, useCart } from '../context/cart';

export const withCart = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
   return function WithCartComponent(props: T): JSX.Element {
      const { state: { products }, dispatch } = useCart();

      useEffect(() => {
         dispatch(fetchCartProducts());
      }, []);

      if (products.isLoading) {
         return <div 
            style={{ 
               display: 'flex',
               width: '100%',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center'
            }}
         >Loading</div>;
      }

      return (
         <Component {...props} />
      );
   };
};
