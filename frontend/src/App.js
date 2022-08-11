import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';

import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';

import { ShoppingCartProvider } from './context/cart.context';

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
