import React, {useContext, useState, useEffect} from "react";
import { Stack } from "react-bootstrap";
import {ShoppingCartContext} from '../context/ShoppingCart';


const Filter = () => {
    const {handleFilter, products, filterQuery} = useContext(ShoppingCartContext);

    const [getColors, setColors] = useState([]);
    const [getGender, setGender] = useState([]);
    const [getType, setType] = useState([]);
    const getPrice = [{key:250, price:"₹0 - ₹250"},{key:450, price:"₹251 - ₹450"},{key:500, price:"₹451 - ₹500"}];

    const AddFilters=(products)=>{
        let filterColor = [...new Set(products.map((item) => item.color))];
        let filterGender = [...new Set(products.map((item) => item.gender))];
        let filterType = [...new Set(products.map((item) => item.type))]
        setColors([...filterColor]);
        setGender([...filterGender]);
        setType([...filterType]);
    }


    useEffect(() => {
        AddFilters(products)
        },[products]);
    


    return (
        <>
        <Stack gap={2} className="filterData">
            <div>
            <h4>Color</h4>
             {getColors.map((item,key) => <div key={`colors-${item.key}-${key}`}><label><input checked={filterQuery.color.includes(item)} type="checkbox" id="color-checkbox" value={item} onChange={e => {handleFilter(item, key="color");}} />{item}</label></div>)}
             </div>
            <div>
            <h4 style={{marginTop:"20px"}}>Gender</h4>
            {getGender.map((item,key) => <div key={`gender-${item.key}-${key}`}><label><input checked={filterQuery.gender.includes(item)} type="checkbox" id="gender-checkbox" label={item} onChange={e => {handleFilter(item, key="gender")}}/>{item}</label></div> )}
            </div>
            <div>
            <h4 style={{marginTop:"20px"}}>Type</h4>
            {getType.map((item,key) => <div key={`type-${item.key}-${key}`}><label><input checked={filterQuery.type.includes(item)} type="checkbox" id="type-checkbox" label={item} onChange={e => {handleFilter(item, key="type")}}/>{item}</label></div> )}
            </div>
            <div>
            <h4 style={{marginTop:"20px"}}>Price</h4>
            {getPrice.map((item, key) => <div key={`price-${item.key}-${key}`} ><label><input checked={filterQuery.price.includes(item.key)} type="checkbox" id="price-checkbox" label={item.price} onChange={e => {handleFilter(item.key, key="price")}}/>{item.price}</label></div> )}
            </div>
        </Stack>
        </>
      );
}
 
export default Filter;