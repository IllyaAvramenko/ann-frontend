import { IProduct } from '../../types/Product.interface';
import { ActionsType } from './cart.context';


export interface IState {
  products: {
    data: IProduct[],
    isLoading: boolean,
    error: string | null
  },
  productsCount: number
}

export const initialState: IState = {
  products: {
    data: [],
    isLoading: false,
    error: null
  },
  productsCount: 0
};

export const cartReducer = (state: IState, action: ActionsType): IState => {
  switch (action.type) {
    case 'ADD_DISPLAY_PRODUCTS': {
      return { ...state, products: {
        ...state.products,
        ...action.payload
      }};
    }

    case 'INCREMENT_PRODUCTS_COUNT': {
      return { ...state, productsCount: state.productsCount++ };
    }

    case 'SET_PRODUCTS_COUNT': {
      return { ...state, productsCount: action.payload.productsCount };
    }
    
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};