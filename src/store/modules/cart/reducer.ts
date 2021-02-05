import { Reducer } from 'redux';
import produce from 'immer';
import { ICartState, ActionTypes } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

// eslint-disable-next-line consistent-return
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  switch (action.type) {
    case ActionTypes.addProductToCartRequest: {
      const { product } = action.payload;

      const productInCartIndex = draft.items.findIndex((item) => item.product.id === product.id);

      if (productInCartIndex >= 0) {
        // eslint-disable-next-line no-param-reassign
        draft.items[productInCartIndex].quantity += 1;
      } else {
        draft.items.push({
          product,
          quantity: 1,
        });
      }

      break;
    }
    case ActionTypes.addProductToCartFailure: {
      // Adicionando ID do produto que falhou na verificação de estoque
      draft.failedStockCheck.push(action.payload.productId);

      break;
    }
    default: {
      return draft;
    }
  }
});

export default cart;
