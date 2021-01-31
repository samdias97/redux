import { Reducer } from 'redux';
import produce from 'immer';
import { ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
};

// eslint-disable-next-line consistent-return
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART': {
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
    default: {
      return draft;
    }
  }
});

export default cart;
