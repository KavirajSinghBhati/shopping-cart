import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useShoppingCart } from '../context/cart.context';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/helper';
import storeItems from '../assets/data.json';

const CartPage = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  if (cartItems.length === 0) {
    return (
      <div className='col-md-4 order-md-2 mb-4'>
        <h4 className='d-flex justify-content-between align-items-center mb-3'>
          <span className='text-muted'>Your cart is Empty</span>
        </h4>
      </div>
    );
  }

  function loadRazorpay() {
    const amount = cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    setOrderAmount(amount);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post('/create-order', {
          amount: orderAmount + '00',
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('/get-razorpay-key');
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post('/pay-order', {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
          },
          prefill: {
            name: 'John Doe',
            email: 'email@example.com',
            contact: '1111111111',
          },
          notes: {
            address: 'Jodhpur, Rajasthan',
          },
          theme: {
            color: '#80c0f0',
          },
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
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
        <Button
          variant='dark'
          className='w-100'
          onClick={loadRazorpay}
          disabled={loading}
        >
          Pay{' '}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = storeItems.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </Button>
      </div>
    </Container>
  );
};

export default CartPage;
