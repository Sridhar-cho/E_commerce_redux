import React from 'react';
import './ShoppingCart.css'; 
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } from './CartSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = cartItems.reduce((total, cartItem)=> total + cartItem.price * cartItem.quantity, 0)
  const handleClearCart = ()=>{
    dispatch(clearCart())
  }
  const handleIncreaseItem =(productId)=>{
    dispatch(increaseItemQuantity(productId))
  }
  const handleDecreaseItem = (productId)=>{
    dispatch(decreaseItemQuantity(productId))
  }
  const handleRemoveItem =(productId)=>{
    dispatch(removeItemFromCart(productId))
  }
  return (
    <>
    <div className="shopping-cart">
      <h2 className="shopping-cart-title">Shopping Cart</h2>
      <ul className="cart-items">
       {cartItems.map(item=> (
        <li key={item.id} className="cart-item">
          <span>{item.name} - ${item.price}</span>
          <div className='quantity-controls'>
            <button onClick={()=>handleDecreaseItem(item.id)}> - </button>
            <span>{item.quantity}</span>
            <button onClick={()=>handleIncreaseItem(item.id)}> + </button>
          </div>
          <button className='remove-item-btn' onClick={()=> handleRemoveItem(item.id)}>Remove</button>
        </li>
       ))}
      </ul>
      <button 
      className={`clear-cart-btn ${cartItems.length === 0 ? "disabled":""}`}
      disabled={cartItems.length === 0}
      onClick={()=>handleClearCart()}
      >
        Clear Cart
      </button>
    </div>
    <div className='total-amount'>{totalAmount ? <h1>The total amount is ${totalAmount}</h1> : ""}</div>
  
    </>
  );
};

export default ShoppingCart;
