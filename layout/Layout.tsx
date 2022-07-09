import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from 'react';
import { CartProvider } from '../context/cart/cart.context';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import s from './Layout.module.css';
import { Menu } from './Menu/Menu';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   children: React.ReactNode
}

const Layout: React.FC<IProps> = React.memo(({ children }) => {
   return (
      <div className={s.wrapper}>
         <Header className={s.header}/>
         <Menu className={s.menu} />
         <div className={s.body}>
            {children}
         </div>
         <Footer className={s.footer} />
      </div>
   );
});

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
   return function withLayoutComponent(props: T): JSX.Element {
      return (
         <CartProvider>
            <Layout>
               <Component {...props} />
            </Layout>
         </CartProvider>
      );
   };
};