import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Container, Nav, Badge, Image,  Button, FormControl, Row,  InputGroup, Col, Popover, OverlayTrigger} from 'react-bootstrap';
import {FaShoppingCart} from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartContext } from '../context/ShoppingCart';
import "./style.css";


function Header() {
  const {cart, handleSearch, isMobile} = useContext(ShoppingCartContext)
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const cartPage = location.pathname === "/cart";
  let total = cart.reduce((accumulator, item) => {return accumulator + (item.quantity * item.price)},0);

  useEffect(() => {handleSearch(searchValue)}, [searchValue]);


  return (
    <>
    {isMobile? 
    (
    <Container>
    <Row>
    <Navbar bg="dark" variant="dark" style={{width:"100%", height:80, position:"fixed", top:0, zIndex:2}}>
      <Container>
        <Navbar.Brand className="d-sm-flex">
          <Link to="/">TeeRex</Link>
        </Navbar.Brand>
        <Nav className="d-sm-flex">
        <Link to="/cart"><Button variant="success"><FaShoppingCart color="white" fontSize="18px" />
              <Badge>{cart.length}</Badge></Button></Link>
        </Nav>
      </Container>
    </Navbar>
    </Row>

    <Row className={cartPage ? "d-none" : ""} style={{marginTop:"80px"}}>
    <InputGroup>
    <InputGroup.Text className="search" style={{width:"100%"}}>
        <FormControl placeholder="Search for Products" onChange={(e) => setSearchValue(e.target.value)}/>
      </InputGroup.Text>
    </InputGroup>
    </Row>
    </Container>
    )
    :
    (
    <Navbar bg="dark" variant="dark" style={{width:"100%", height:80, position:"fixed", top:0, zIndex:2}}>
      <Container>
        <Navbar.Brand className="d-sm-flex">
          <Link to="/">TeeRex</Link>
        </Navbar.Brand>
        <Navbar.Text className= {cartPage ? "d-none" : "search"} >
          <FormControl placeholder="Search for Products" className="m-auto" onChange={(e) => setSearchValue(e.target.value)}/>
        </Navbar.Text>
        <Nav className="d-sm-flex">
            <Link to="/cart">
              <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    offset={[0, 10]}
                  flip={{ padding: 10, boundariesElement: 'scrollParent' }}
                  preventOverflow={{ padding: 10, boundariesElement: 'scrollParent' }}
                    overlay={
                      <Popover id={`popover-positioned-bottom`} style={{ padding: '10px' }}>
                        <Popover.Header as="h3">{cart.length?`Total: ₹${total}`:`Add Items`}</Popover.Header>
                        <Popover.Body>
                        {cart.map((item) => (
                          <Row key={`cart-item-${item.id}`} lg={2} >
                            <Col>
                              <Image thumbnail src={item.imageURL} style={{ height: 50 }} />
                            </Col>
                            <Col style={{ padding: 5 }}>
                            <div className="sm-text">{item.quantity}x{item.name}</div>
                              <div><b>₹{item.quantity * item.price}</b></div>
                            </Col>
                          </Row>
                        ))}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    
                    <Button variant="success">
                      <div><FaShoppingCart color="white" fontSize="25px" />
                      <Badge>{cart.length}</Badge></div>
                    </Button>
                    
                  </OverlayTrigger>
              </Link>
        </Nav>
      </Container>
    </Navbar>)
}  
    </>
  )
}

export default Header