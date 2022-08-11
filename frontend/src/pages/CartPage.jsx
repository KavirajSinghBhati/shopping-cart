import React from 'react';
import { Container } from 'react-bootstrap';

import { useShoppingCart } from '../context/cart.context';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/helper';
import storeItems from '../assets/data.json';

const CartPage = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  if (cartItems.length === 0) {
    return (
      <div className='col-md-4 order-md-2 mb-4'>
        <h4 className='d-flex justify-content-between align-items-center mb-3'>
          <span className='text-muted'>Your cart is Empty</span>
        </h4>
      </div>
    );
  }
  return (
    <Container>
      <div className='col-md-4 order-md-2 mb-4'>
        <h4 className='d-flex justify-content-between align-items-center mb-3'>
          <span className='text-muted'>Your cart</span>
          <span className='text-muted'>
            Total {cartQuantity > 1 ? `${cartQuantity} items` : `1 item`}
          </span>
        </h4>
        <ul className='list-group mb-3'>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </ul>
        <div className='mb-3 fw-bold fs-5 '>
          Total{' '}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = storeItems.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
