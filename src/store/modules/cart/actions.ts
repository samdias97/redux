import { IProduct, ActionTypes } from './types';

// Requisição para adicionar o produto ao carrinho
export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartRequest,
    payload: {
      product,
    },
  };
}

// Se a requisição deu certo e passou pela checagem de estoque
export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product,
    },
  };
}

// Se a requisição não deu certo e não tem o produto em estoque
export function addProductToCartFailure(productId: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: {
      productId,
    },
  };
}
