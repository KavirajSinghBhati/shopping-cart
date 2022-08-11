import React from 'react';
import { Container, Nav, Navbar as NavbarE } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { ReactComponent as CartIcon } from '../assets/cart-icon.svg';

const Navbar = () => {
  return (
    <NavbarE sticky='top' className='bg-light shadow-sm mb-3'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link to='/' as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to='/store' as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to='/about' as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Link to='/cart'>
          <CartIcon
            style={{ width: '2.5rem', height: '2.5rem', cursor: 'pointer' }}
          />
        </Link>
      </Container>
    </NavbarE>
  );
};

export default Navbar;
