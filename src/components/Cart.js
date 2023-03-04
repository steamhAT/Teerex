import React from 'react'
import { useContext } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCart';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import "./style.css";
import { Link } from 'react-router-dom';

const Cart = () => {
  const {cart, increaseCartQuantity, decreaseCartQuantity, getAvailableQuantity} = useContext(ShoppingCartContext)
  let total = cart.reduce((accumulator, item) => {return accumulator + (item.quantity * item.price)},0);
  let totalItems = cart.reduce((accumulator, item) => {return accumulator + (item.quantity)},0);

  return (
    <>
    <div className="cartPage">
    {cart.length ? (<div><h4>Cart</h4>{cart.map(item => 
    
    (             
    <Card key={item.id} className="shadow p-3 bg-white rounded">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
              <Card.Img variant="top" src={item.imageURL} height="50px"  style={{ width: '4rem', objectFit:"cover"}}/>
              <span>
              <div className="fs-2">{item.name}</div>
              <div className="fs-2 text-success">{getAvailableQuantity(item.id)} Available</div>
              </span>
                  <div className="d-flex align-items-center flex-column" style={{gap:".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{gap:".5rem"}}>
                    <Button variant="danger" onClick={() => decreaseCartQuantity({id:item.id, name:item.name, price:item.price, quantity:getAvailableQuantity(item.id)})}>-</Button>
                    <div><span className="fs-3">{item.quantity}</span></div>
                    <Button variant="success" onClick={() => increaseCartQuantity({id:item.id, name:item.name, price:item.price, quantity:getAvailableQuantity(item.id), imageURL:item.imageURL})}>+</Button>
                    </div>
                  </div>
            </Card.Title>
              <div>
                <span className="ms-2 text-muted">₹{item.price}</span>
                <span className="ms-2 text-muted">xQty {item.quantity}</span>
                <span className="ms-2 text-muted"><b>= ₹{item.price * item.quantity}</b></span>
              </div>   
    </Card>
    
)
    
    )}
        <br/>
        <Container>
        <Row xs="auto" md={4} lg={8}>
          <Col>
            <h2 className="text-secondary responsive-text">Cart Value: </h2>
            <h2 className="text-secondary responsive-text">({totalItems} Items) </h2> 
          </Col>
          <Col>
            <h2 className="text-success responsive-text">₹{total} </h2>    
          </Col>
        </Row>
        </Container>
    
    </div>): 
            <div>
            <h4>Add items to your shopping cart</h4>
            <Link to="/">
              <Button>
               Browse Products
            </Button>
              </Link>
              </div>
    }
    </div>
    </>
  )
}

export default Cart;