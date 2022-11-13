import { FormikHelpers } from 'formik';
import { NextRouter } from 'next/router';
import { ApiClass } from '../../api/api';
import { DispatchThunk } from '../../hooks/useReducerWithThunk';
import { ValuesType } from '../../pages/order';
import { IShipping, OrderCreateType } from '../../types/Order.interface';
import { IProduct } from '../../types/Product.interface';   
import { AsyncAction } from '../types';
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

   setDisplayProducts: (payload: AsyncAction<IProduct[]>) => ({
      type: 'ADD_DISPLAY_PRODUCTS',
      payload
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
   } else {
      window.sessionStorage.setItem(PRODUCTS_SLUGS_TO_BUY, JSON.stringify([productSlug]));
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
      try {
         dispatch(actions.setDisplayProducts({ isLoading: true }));

         const products = await api.getProductsBySlugs(JSON.parse(slugs));

         dispatch(actions.setDisplayProducts({ data: products }));
      } catch (e: any) {
         dispatch(actions.setDisplayProducts({ error: e.message }));
      } finally {
         dispatch(actions.setDisplayProducts({ isLoading: false }));
      }
   }
};

export const initializeProductInCart = (): ThunkType => dispatch => {
   const productsSlugsToBuy = window.sessionStorage.getItem(PRODUCTS_SLUGS_TO_BUY);

   if (productsSlugsToBuy) {
      const parsedSlugs: string[] = JSON.parse(productsSlugsToBuy);

      dispatch(actions.setProductsInCartCount(parsedSlugs.length));
   }
};

export const createOrder = (values: ValuesType, formikHelpers: FormikHelpers<ValuesType>, router: NextRouter): ThunkType => async (dispatch, getState) => {
   const { products } = getState();

   const orderBody: OrderCreateType = generateBodyCreateOrder(values, products.data);
   
   try {
      formikHelpers.setSubmitting(true);
      const order = await new ApiClass().createOrder(orderBody);

      formikHelpers.setStatus({ success: 'Order successfuly created. We sent an email to you' });
   } catch (e) {
      formikHelpers.setStatus({ error: 'Something went wrong while creating order. Please refresh page and try again' });
   } finally {
      formikHelpers.setSubmitting(false);

      setTimeout(() => {
         formikHelpers.setStatus();
         router.push('/cart');
      }, 10000);
   }
};

const generateBodyCreateOrder = (values: ValuesType, products: IProduct[]): OrderCreateType => {
   const shippingInfo: IShipping = {
      type: values.country === 'Ukraine' ? 'NOVA_POSHTA' : 'BY_ADDRESS',
      country: values.country,
      city: values.city,
      address: values.address,
      novaPoshta: values.novaPoshta,
      postalCode: values.postalCode,
   };
   const body: OrderCreateType = {
      productIds: products.map(p => p._id),
      contactInfo: {
         byFather: values.byFather,
         email: values.email,
         name: values.name,
         phone: values.phone,
         surname: values.surname
      },
      shippingInfo: Object.fromEntries(Object.entries(shippingInfo).filter(([_, v]) => !!v)) as IShipping
   };

   return body;
};

type ThunkType = DispatchThunk<CartReducerType>;

