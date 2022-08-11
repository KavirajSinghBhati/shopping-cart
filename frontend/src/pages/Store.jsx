import React from 'react';
import { Col, Row } from 'react-bootstrap';
import shopData from '../assets/data.json';

import Item from '../components/Item';

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-4'>
        {shopData.map((item) => (
          <Col key={item.id}>
            <Item {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
