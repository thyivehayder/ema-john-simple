import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import orderImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart]=useState([])
    const [order,setOrder]=useState(false)
    const history = useHistory()
    const handlePlaceOrder =()=>{
        
        history.push('/shipment')

    }
   

    const removeProduct=productKey=>{
        console.log('Remove Clicked',productKey)
        const newCart=cart.filter(element=>element.key!==productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(()=>{
        const saveCart=getDatabaseCart()
        const productCart=Object.keys(saveCart)
        // console.log(productCart)
       const cartProducts=productCart.map(element=>{
           const product=fakeData.find(product=>product.key===element)
           product.quantity=saveCart[element]
           return product
       })
       setCart(cartProducts)
        // console.log(cartProducts);
    },[])

    let thankYou;
    if(order){
        thankYou=<img src={orderImage} alt=""/>
    }
    return (
        <div className='twin-container'>
            <div className='product-container'>
            {
                    cart.map(element =><ReviewItem element={element}
                        key={element.key}
                        removeProduct={removeProduct}></ReviewItem>)
                       
            }
             {thankYou}
            </div>
            <div>
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className='product-button'>Proceed Checkout</button>
            </Cart>
            </div>
               
        </div>
    );
};

export default Review;