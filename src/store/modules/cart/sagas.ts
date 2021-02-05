import { AxiosResponse } from 'axios';
import {
  all, select, takeLatest, call, put,
} from 'redux-saga/effects';
import { IState } from '../..';
import { ActionTypes } from './types';
import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure } from './actions';
import api from '../../../services/api';

// Define a tipagem do parâmetro da função
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

// Tipagem do "stock" da API
interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  // eslint-disable-next-line max-len
  const currentQuantity: number = yield select((state: IState) => state.cart.items.find((item) => item.product.id === product.id)?.quantity ?? 0);
  // Faz uma checagem da quantidade atual do produdo específico
  // O "select" é usado para buscar informações do estado

  // Utiliza-se o método "call" para realizar uma chamada à API (para qualquer Promise)
  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  // Verifica se ainda existe o produto em estoque
  if (availableStockResponse.data.quantity > currentQuantity) {
    // Método "put" serve para o mesmo fim do "dispatch", serve para disparar uma ação
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  // takeLatest --> Sempre executa a última requisição
  // 'ADD_PRODUCT_TO_CART' --> Action que será ouvida, que vai esperar para ser chamada
  // checkProductStock --> Função que será executada quando a action foi disparada
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
