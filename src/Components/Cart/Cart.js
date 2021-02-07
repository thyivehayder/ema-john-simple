import React from 'react';
const Cart = (props) => {
    const cart=props.cart
    let price=cart.reduce((price,element)=>price+element.price*element.quantity,0)
    let shipping=0
    if(price>35){
        shipping=0;
    }
    else if (price>15) {
        shipping=4.99;
    }
    else if(price>0){
    shipping=12.99;
    }

    const tax=(price*0.1).toFixed(2)
    const grandTotal=(price+shipping+Number(tax)).toFixed(2)
    return (
        <div>
            <h4>  Order Summary </h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {price.toFixed(2)}</p>
            <p><small>Shipping Cost:{shipping} </small></p>
            <p><small>Tax+VAT:{tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            {props.children}
        </div>
    );
};

export default Cart;