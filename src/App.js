import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header"
import Home from"./components/Home";
import Cart from "./components/Cart.js"
import { ShoppingCartProvider } from './context/ShoppingCart';

export const config = {
  endpoint:"https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
  };

function App() {
  return (
    <BrowserRouter>
    <ShoppingCartProvider>
    <Header/>
    <Container>
    <Routes>
    <Route path="/" exact element={<Home/>} />
    <Route path="/cart" exact element={<Cart/>}/> 
    </Routes>
    </Container>
    </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
