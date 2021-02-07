import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductsDetails = () => {
    const {key}=useParams()
    const details=fakeData.find(element=>element.key===key)
    console.log(details);
    return (
        <div>
            <h1>Your Product-{key} Details</h1>
            <Product showAddToCart={false} products={details}></Product>
            
        </div>
    );
};

export default ProductsDetails;