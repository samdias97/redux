import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

// É utilizado generators: '*' representa o 'async' e o 'yield' representa o 'await'
export default function* rootSaga() {
  return yield all([
    cart,
  ]);
}
