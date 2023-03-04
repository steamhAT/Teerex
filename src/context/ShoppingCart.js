import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { config } from '../App';

export const ShoppingCartContext = createContext();


export const ShoppingCartProvider =(props) =>{
    const [products, setProducts] = useState([]);
    const [cart, setCartItems] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterQuery, setFilterQuery] = useState({color:[], type:[], gender:[], price:[], searchQuery:""});
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    
            const performApiCall = async () => {
                setIsLoading(true);
                try {
                    let urlData = await axios.get(`${config.endpoint}`);
                    let Data = urlData.data;
                    setProducts(Data);
                    setIsLoading(false);
                    // console.log(Data)
                }catch (e){
                    console.log(e);
                    alert(e.message)
                }
            }


            useEffect(() => {
                function handleResize() {
                  setIsMobile(window.innerWidth < 768);
                }
                handleResize();
                performApiCall();
                window.addEventListener('resize', handleResize);
            
                return () => {
                  window.removeEventListener('resize', handleResize);
                };
              }, []);


            useEffect(() => {
                setFilteredProducts([...products]);
            }, [products]);



    function getItemQuantity(id){
        // Item Quantity available in Cart
        const cartQuantity = cart.find(item => item.id===id)
        if(cartQuantity === undefined){
            return 0;
        }   
            return cartQuantity;
        }

    function getAvailableQuantity(id){
        // Item Quantity available in available to add in cart 
         
        const availableQuantity = products.find(item => item.id===id)   
        return availableQuantity.quantity;
    }  

    function increaseCartQuantity({id, name, price, quantity, imageURL}){
        
        if(cart.length === 0 && quantity>0){
            return setCartItems([{id:id, name:name, price:price, quantity:1, imageURL:imageURL}])
        }else if(cart.some(item => item.id === id)){
            const updateItem = cart.map(obj => {
                if(obj.id === id && quantity>obj.quantity){
                    return {...obj, quantity:obj.quantity+1};
                }
                if(obj.id === id && quantity===obj.quantity){
                   alert("Maximum "+quantity+" "+name+"s available");
                }
                return obj;   
            });
            setCartItems(updateItem);
        }else if(quantity>0){
            return setCartItems([...cart, {id:id, name:name, price:price, quantity:1, imageURL:imageURL}]);
        }else{
            alert("Sorry this product is unavailable");
        }

        
    };


function decreaseCartQuantity({id}){
        const updateItem = cart.map(obj => {
            if(obj.id === id && 0<obj.quantity){
                return {...obj, quantity:obj.quantity-1};
            }
            return obj;   
        }).filter(item => item.quantity!==0);
        
        return setCartItems(updateItem);
        
    }



    const handleSearch = (searchValue) =>{
        return setFilterQuery({...filterQuery, searchQuery:searchValue.toString().toLowerCase()});
      }



      // This function will add items to different categories of the filterQuery.
    const handleFilter = (item, category) => {
        setFilterQuery(prevState => {
            return {
                ...prevState,
                [category]: prevState[category].includes(item)
                ? prevState[category].filter(c => c !== item)
                : [...prevState[category], item]
            };
        });
  
    }


    const handleSearchFilter = (searchQuery, product) => {
        const query = searchQuery.toLowerCase().split(" ");
        return query.every((word) => {
          return Object.values(product).some((value) => {
            return typeof value === "string" && value.toLowerCase().includes(word);
          });
        });
      };



    const handlePriceFilter = (item, product) => {
        for (const filter of item) {
            switch (filter) {
              case 250:
                if (product.price < 251) {
                  return true;
                }
                break;
              case 450:
                if (product.price >= 251 && product.price < 451) {
                  return true;
                }
                break;
              case 500:
                if (product.price >= 451 && product.price < 501) {
                  return true;
                }
                break;
              default:
                break;
            }
          }
          return false;
        
    }


        const handleFilterQuery = (filterQuery, products) => {
            let newData = [];
            if (Object.keys(filterQuery).some(key => filterQuery[key].length > 0)) {
              newData = products.filter((product) => {
                return (
                  (filterQuery.color.length === 0 || filterQuery.color.includes(product.color)) &&
                  (filterQuery.gender.length === 0 || filterQuery.gender.includes(product.gender)) &&
                  (filterQuery.type.length === 0 || filterQuery.type.includes(product.type)) &&
                  (filterQuery.price.length === 0 || handlePriceFilter(filterQuery.price, product)) &&
                  (filterQuery.searchQuery.length === 0 || handleSearchFilter(filterQuery.searchQuery, product))
                );
              });
              newData = Array.from(new Set(newData));
            } else {
              newData = products;
            }
            setFilteredProducts(newData);
          };
          
            useEffect(() => {
            handleFilterQuery(filterQuery, products);
            }, [filterQuery])

    return(
    <ShoppingCartContext.Provider value={{isLoading, cart, filterQuery, products, filteredProducts, isMobile , getItemQuantity, increaseCartQuantity, decreaseCartQuantity, setCartItems, handleFilter, handleSearch, getAvailableQuantity}}>
        {props.children}
    </ShoppingCartContext.Provider>
    )
}
