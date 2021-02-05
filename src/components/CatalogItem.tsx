import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../store/modules/cart/types';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IState } from '../store';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }:CatalogItemProps) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line max-len
  const hasFailedStockCheck = useSelector<IState, boolean>((state) => state.cart.failedStockCheck.includes(product.id));

  const handleAddProductsToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article>
      <strong>{product.title}</strong>
      {' - '}
      <span>{product.price}</span>
      {' '}

      <button
        type="button"
        onClick={handleAddProductsToCart}
      >
        Comprar
      </button>

      { hasFailedStockCheck && <span style={{ color: 'red' }}>Falta de estoque</span>}
    </article>
  );
};

export default CatalogItem;
