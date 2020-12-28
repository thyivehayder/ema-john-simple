import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    const { img, name, seller, price, stock } = props.products;
    return (
        <div className='products'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <br />
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p>Only {stock} left in stock- Order Soon</p>
                <button onClick={()=>props.handleAddProduct(props.products)} className='product-button'> <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
        </div>

    );
};

export default Product;