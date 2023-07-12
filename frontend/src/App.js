import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import OrderListPage from './pages/admin/OrderListPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/order/:id' element={<OrderPage />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart/:id?' element={<CartPage />} />
            <Route path='/admin/userlist' element={<UserListPage />} />
            <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
            <Route path='/admin/productlist' element={<ProductListPage />} />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListPage />}
            />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditPage />}
            />
            <Route path='/admin/orderlist' element={<OrderListPage />} />
            <Route path='/search/:keyword' element={<HomePage />} />
            <Route path='/page/:pageNumber' element={<HomePage />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomePage />}
            />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
