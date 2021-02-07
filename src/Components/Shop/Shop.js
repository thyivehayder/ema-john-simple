import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10=fakeData.slice(0,10)
    const [products,setProducts]=useState(first10)
    const [cart,setCart]=useState([])
    useEffect(()=>{
        const savedCart=getDatabaseCart()
        const productsKey=Object.keys(savedCart)
        const previousCart=productsKey.map(element=>{
            const product=fakeData.find(products=>products.key===element)
            product.quantity=savedCart[element]
            return product
        })
        setCart(previousCart)
    },[])

    const addEventHandler=(product)=>{
        // console.log('added',product)
        const sameProduct=cart.find(element=>element.key===product.key)
        let count=1
        let newCart
        if(sameProduct){
            count=sameProduct.quantity+1
            sameProduct.quantity=count
            const others=cart.filter(element=>element.key!==product.key)
             newCart=[...others,sameProduct]
        }
        else{
            product.quantity=1
            newCart=[...cart,product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key,count)
    }
    return (
        <div className='twin-container'>
                <div className='product-container'>
                    {/* <ul>
                        {products.map(element=><li>{element.name}</li>)}
                    </ul> */}
                   {products.map(element=><Product showAddToCart={true} handleAddProduct={addEventHandler} products={element} key={element.key}></Product>)}

                </div> 
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to='/review'><button className='product-button'>Review Order</button></Link>
                    </Cart>
                    
                </div>
            
        </div>
    );
};

export default Shop;