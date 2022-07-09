import { IProduct } from '../../types/Product.interface';
import { ActionsType } from './cart.context';


export interface IState {
  products: IProduct[]
  productsCount: number
}

export const initialState = {
  products: [],
  productsCount: 0
};

export const cartReducer = (state: IState, action: ActionsType): IState => {
  switch (action.type) {
    case 'ADD_DISPLAY_PRODUCTS': {
      return { ...state, products: [...action.payload.products] };
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