import React, {useContext, useState} from 'react'
import { Row, Col, Container, Button, ButtonGroup, Spinner} from 'react-bootstrap';
import ProductsCard from './ProductsCard';
import Filter from './Filter';
import {ShoppingCartContext} from '../context/ShoppingCart';
import {FaFilter} from "react-icons/fa";
import "./style.css";


const Home = () => {

  const {filteredProducts, isMobile, isLoading} = useContext(ShoppingCartContext);
  const [toggleState, setToggleState] = useState(false);
  


  return (
    <>
      <Container style={{position:"relative", top:"90px", width:"100%"}}>
      <Row>
      {isMobile && !isLoading?
                (
                  <>
                  <Col md="3">
                  <Button
                      as={ButtonGroup}
                      key="primary"
                      id={`dropdown-variants-primary`}
                      onClick={e => setToggleState(!toggleState)}
                      >
                    <FaFilter color="white" fontSize="18px" />
                  </Button>
                    {toggleState?
                    <div className="MobileFilterClass">
                    <div>Filter</div>
                    <Filter />
                    </div>:<div>Filter</div>} 
                  </Col>
                  </>
                )
      :              
            filteredProducts && !isLoading ? (
              <Col md="2" lg="2">
              <div>
              <Filter/>
              </div>        
             </Col>
              ):
              <div className="LoadingDiv">
                <div>Loading Products</div>
                <Spinner animation="border" variant="primary" />
                </div> 
              }
        {filteredProducts
            ?
               <Col>
                 <Row md={2} xs={1} lg={3} className="g-5">
                   {filteredProducts.map((item) => (
                   <Col key={item.id}  className="p-3">
                   <ProductsCard {...item}/>
                   </Col>
                   ))}
                 </Row>
               </Col>
            :    <div className="LoadingDiv">
                 <div>Loading Products</div>
                 <Spinner animation="border" variant="primary" />
                 </div>
          }
        </Row>
        </Container>
    </>
  )
}

export default Home;