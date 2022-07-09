import React, { FC, Reducer } from 'react';
import { ActionOrThunk, useThunkReducer } from '../../hooks/useReducerWithThunk';
import { InferActionsTypes } from '../types';
import { actions } from './cart.actions';
import { cartReducer, initialState, IState } from './cart.reducer';


interface IProviderProps { children: React.ReactNode }

interface ICartContext {
  state: IState
  dispatch: Dispatch
}

const CartStateContext = React.createContext<ICartContext | undefined>(undefined);

const CartProvider: FC<IProviderProps> = ({ children }) => {
  const [state, dispatch] = useThunkReducer<CartReducerType>(cartReducer, initialState);

  const value = {state, dispatch};
  return (
    <CartStateContext.Provider value={value}>
      {children}
    </CartStateContext.Provider>
  );
};

function useCart() {
  const context = React.useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };

export type ActionsType = InferActionsTypes<typeof actions>;
type Dispatch = (action: ActionOrThunk<CartReducerType>) => void;
export type CartReducerType = Reducer<IState, ActionsType>;