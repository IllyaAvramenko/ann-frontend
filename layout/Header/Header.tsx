import React, { useState, FC, DetailedHTMLProps, HTMLAttributes, useEffect, ChangeEvent } from 'react';
import cn from 'classnames';
import s from './Header.module.css';
import { P } from '../../components/P/P';
import Link from 'next/link';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { MobileNav } from '../MobileNav/MobileNav';
import { useCart } from '../../context/cart/cart.context';
import { initializeProductInCart } from '../../context/cart/cart.actions';
import useDebounce from '../../hooks/useDebounce';
import { ApiClass } from '../../api/api';
import { IProduct } from '../../types/Product.interface';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header: FC<IProps> = React.memo(({ className, ...props }) => {
   const api = new ApiClass();

   const { state, dispatch } = useCart();

   const [products, setProducts] = useState<IProduct[]>();
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [value, setValue] = useState<string>('');
   const debouncedValue = useDebounce<string>(value, 700);

   useEffect(() => {
      dispatch(initializeProductInCart());
   }, []);

   useEffect(() => {
      loadProducts();
   }, [debouncedValue]);

   const loadProducts = async () => {
      const products = await api.getProducts('', { search: debouncedValue });
      console.log(products.data.items);
      setProducts(products.data.items);
   };

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
   };
   
   return (
      <header
         {...props}
         className={cn(className, s.header)}
      >
         <div className={s.wrapper}>
            <div className={s.search}>
               <form action="#">
                  <input type="text" placeholder='Search' value={value} onChange={handleChange}/>
               </form>
            </div>
            <div className={s.mobileMenu}>
               <MobileMenu 
                  isOpen={isMobileMenuOpen} 
                  setIsOpen={setIsMobileMenuOpen}   
               />
            </div>
            <Link href={'/cart'}>

               <div className={s.basket}>
                  <BasketIcon/>
                  <P size='s'>Cart: {state.productsCount}</P>
               </div>

            </Link>
         </div>
         <MobileNav 
            className={cn(s.mobileNav, {
               [s.mobileNavOpen]: isMobileMenuOpen 
            })}
            />
      </header>
   );
});

const BasketIcon = () => {
   return (
      <div style={{ margin: '5px 5px 0px 0px' }}>
         <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 256 256" style={{ fill: '#fff' }}>
<g transform="translate(128 128) scale(0.72 0.72)">
	<g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, opacity: 1 }} transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
	<path d="M 74.396 66.93 h -47.12 c -3.491 0 -5.549 -2.665 -5.777 -5.299 c -0.178 -2.057 0.741 -4.326 2.792 -5.506 L 16.745 22.34 c -0.132 -0.592 0.012 -1.213 0.392 -1.687 c 0.379 -0.474 0.954 -0.75 1.561 -0.75 H 88 c 0.647 0 1.256 0.314 1.631 0.842 c 0.375 0.528 0.471 1.206 0.258 1.817 l -7.983 22.876 c -0.991 2.838 -3.446 4.921 -6.406 5.438 l -48.522 8.48 c -0.006 0.001 -0.012 0.002 -0.019 0.003 c -1.499 0.267 -1.507 1.541 -1.473 1.926 c 0.033 0.386 0.261 1.644 1.792 1.644 h 47.12 c 1.104 0 2 0.896 2 2 S 75.501 66.93 74.396 66.93 z M 21.193 23.904 l 6.966 31.186 l 46.652 -8.152 c 1.533 -0.268 2.805 -1.347 3.318 -2.817 l 7.055 -20.216 H 21.193 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
	<path d="M 27.846 83.111 c -3.615 0 -6.555 -2.94 -6.555 -6.555 c 0 -3.615 2.94 -6.556 6.555 -6.556 s 6.556 2.94 6.556 6.556 C 34.401 80.171 31.46 83.111 27.846 83.111 z M 27.846 74.001 c -1.409 0 -2.555 1.146 -2.555 2.556 c 0 1.408 1.146 2.555 2.555 2.555 c 1.409 0 2.556 -1.146 2.556 -2.555 C 30.401 75.147 29.255 74.001 27.846 74.001 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
	<path d="M 68.845 83.111 c -3.615 0 -6.556 -2.94 -6.556 -6.555 c 0 -3.615 2.94 -6.556 6.556 -6.556 s 6.556 2.94 6.556 6.556 C 75.4 80.171 72.46 83.111 68.845 83.111 z M 68.845 74.001 c -1.409 0 -2.556 1.146 -2.556 2.556 c 0 1.408 1.146 2.555 2.556 2.555 s 2.556 -1.146 2.556 -2.555 C 71.4 75.147 70.254 74.001 68.845 74.001 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
	<path d="M 18.695 23.904 c -0.916 0 -1.742 -0.633 -1.95 -1.564 l -1.407 -6.301 c -0.677 -3.033 -3.321 -5.151 -6.428 -5.151 H 2 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 6.909 c 4.995 0 9.244 3.404 10.333 8.279 l 1.407 6.301 c 0.241 1.078 -0.438 2.147 -1.516 2.388 C 18.986 23.889 18.839 23.904 18.695 23.904 z" style={{ stroke: 'none', strokeWidth: 1,strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
</g>
</g>
</svg>
      </div>
   );
};