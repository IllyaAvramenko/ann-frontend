import { NextRouter } from 'next/router';
import { ApiClass } from '../../api/api';
import { DispatchThunk } from '../../hooks/useReducerWithThunk';
import { IProduct } from '../../types/Product.interface';   
import { CartReducerType } from './cart.context';

export const PRODUCTS_SLUGS_TO_BUY = 'productsSlugsToBuy';

export const actions = {
   addProductToCart: () => {
      return {
         type: 'INCREMENT_PRODUCTS_COUNT'
      } as const;
   },

   removeProductFromCart: () => {
      return {
         type: 'REMOVE_PRODUCT_FROM_CART'
      } as const;
   },

   setDisplayProducts: (products: IProduct[]) => ({
      type: 'ADD_DISPLAY_PRODUCTS',
      payload: { products }
   } as const),
   
   setProductsInCartCount: (productsCount: number) => ({
      type: 'SET_PRODUCTS_COUNT',
      payload: { productsCount }
   } as const),
};

export const addProductToCart = (productSlug: string, router: NextRouter): ThunkType => async dispatch => {
   const productsSlugsToBuy = window.sessionStorage.getItem(PRODUCTS_SLUGS_TO_BUY);

   if (productsSlugsToBuy) {
      const parsedSlugs: string[] = JSON.parse(productsSlugsToBuy);

      const isSlugExist = parsedSlugs.find(slug => slug === productSlug);
      
      if (!isSlugExist) {
         const productsToBuy = [...parsedSlugs, productSlug];

         window.sessionStorage.setItem(PRODUCTS_SLUGS_TO_BUY, JSON.stringify(productsToBuy));
         dispatch(actions.addProductToCart());
      }

      router.push('/cart');
      console.log(window.sessionStorage.getItem(PRODUCTS_SLUGS_TO_BUY));
   } else {
      window.sessionStorage.setItem(PRODUCTS_SLUGS_TO_BUY, JSON.stringify([productSlug]));
      console.log(window.sessionStorage.getItem(PRODUCTS_SLUGS_TO_BUY));
   }
};

export const removeProductFromCart = (productSlug: string): ThunkType => async dispatch => {
   const productsSlugsToBuy = window.sessionStorage.getItem(PRODUCTS_SLUGS_TO_BUY);

   if (productsSlugsToBuy) {
      const parsedSlugs: string[] = JSON.parse(productsSlugsToBuy);

      const filtredSlugs = parsedSlugs.filter(slug => slug !== productSlug);
      window.sessionStorage.setItem(PRODUCTS_SLUGS_TO_BUY, JSON.stringify(filtredSlugs));

      dispatch(fetchCartProducts());
      dispatch(initializeProductInCart());
   }
};

export const fetchCartProducts = (): ThunkType => async (dispatch) => {
   const api = new ApiClass();
   const slugs = window.sessionStorage.getItem(PRODUCTS_SLUGS_TO_BUY);

   if (slugs) {
      const products = await api.getProductsBySlugs(JSON.parse(slugs));

      dispatch(actions.setDisplayProducts(products));
   }
};

export const initializeProductInCart = ():ThunkType => dispatch => {
   const productsSlugsToBuy = window.sessionStorage.getItem(PRODUCTS_SLUGS_TO_BUY);

   if (productsSlugsToBuy) {
      const parsedSlugs: string[] = JSON.parse(productsSlugsToBuy);

      dispatch(actions.setProductsInCartCount(parsedSlugs.length));
   }
};

type ThunkType = DispatchThunk<CartReducerType>;