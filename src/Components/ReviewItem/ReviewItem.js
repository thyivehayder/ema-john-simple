import React from 'react';


const ReviewItem = (props) => {
    const { name, quantity, key,price} = props.element
    const reviewStyle = {
        borderBottom: '2px solid lightgrey',
        paddingBottom: '5px',
        marginBottom: '5px',
        marginLeft: '200px'
    }
    return (

        <div style={reviewStyle}>
            <h4 className='product-name'>{name} </h4>
            <p>Quantity :{quantity}</p>
            <small>${price}</small> 
            <br />
            <button onClick={() => props.removeProduct(key)} className='product-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;