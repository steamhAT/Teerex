import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import {ShoppingCartContext} from '../context/ShoppingCart';



function ProductsCard({id, imageURL, name, type, gender, price, quantity}) {
    const {decreaseCartQuantity,increaseCartQuantity, getItemQuantity} = useContext(ShoppingCartContext);
    const itemQty = getItemQuantity(id);
    return (
    <Card className="shadow p-3 bg-white rounded">
        <Card.Img variant="top" src={imageURL} height="300px" style={{objectFit:"cover"}}/>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
             <span className="fs-2">{name}</span>
             <span className="ms-2 text-muted"><b>₹{price}</b></span>   
            </Card.Title>
            <div className="mt-auto">
                { itemQty === 0 ?
                (<div>
                {quantity === 0 ? <Button className="w-100" variant="danger" onClick={() => increaseCartQuantity({id, name, price, quantity, imageURL})} >Out of Stock</Button> : <Button className="w-100" onClick={() => increaseCartQuantity({id, name, price, quantity, imageURL})}>Add to Cart</Button>}
                </div>
                ):(
                <div className="d-flex align-items-center flex-column" style={{gap:".5rem"}}>
                  <div className="d-flex align-items-center justify-content-center" style={{gap:".5rem"}}>
                    <Button variant="danger" onClick={() => decreaseCartQuantity({id, name, price, quantity})}>-</Button>
                    <div><span className="fs-3">{quantity-itemQty.quantity} Available</span></div>
                    <Button variant="success" onClick={() => increaseCartQuantity({id, name, price, quantity, imageURL})}>+</Button>
                    </div>
                    </div>)}
            </div>
        </Card.Body>
    </Card>
  )
}

export default ProductsCard