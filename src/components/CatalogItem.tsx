import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { IProduct } from '../store/modules/cart/types';
import { addProductToCart } from '../store/modules/cart/actions';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }:CatalogItemProps) => {
  const dispatch = useDispatch();

  const handleAddProductsToCart = useCallback(() => {
    dispatch(addProductToCart(product));
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
    </article>
  );
};

export default CatalogItem;
