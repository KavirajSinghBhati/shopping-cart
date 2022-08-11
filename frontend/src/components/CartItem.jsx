import React from 'react';
import { Button, Stack } from 'react-bootstrap';

import storeItems from '../assets/data.json';
import { formatCurrency } from '../utils/helper';
import { useShoppingCart } from '../context/cart.context';

const CartItem = ({ id, quantity }) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <li className='list-group-item d-flex justify-content-between lh-condensed mb-2'>
      <Stack
        direction='horizontal'
        gap={2}
        className='d-flex align-items-center'
      >
        <div className='me-auto'>
          <div>
            {item.title}{' '}
            {quantity > 1 && (
              <span className='text-muted' style={{ fontSize: '.65rem' }}>
                x {quantity}{' '}
              </span>
            )}
          </div>
          <div className='text-muted' style={{ fontSize: '.75rem' }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
        <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
        <Button
          variant='outline-danger'
          size='sm'
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
    </li>
  );
};

export default CartItem;
