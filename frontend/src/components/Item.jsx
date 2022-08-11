import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from '../utils/helper';

import { useShoppingCart } from '../context/cart.context';

const Item = ({ id, title, price, thumbnail }) => {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={thumbnail}
        height='200px'
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-3'>{title}</span>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          <Button
            variant='dark'
            className='w-100'
            onClick={() => increaseCartQuantity(id)}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Item;
