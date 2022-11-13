import { FunctionComponent } from 'react';
import { CartProvider } from '../context/cart/cart.context';

export const withProviders = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
   return function WithProvidersComponent(props: T): JSX.Element {

      return <CartProvider>
         <Component {...props} />
      </CartProvider>;
   };
};