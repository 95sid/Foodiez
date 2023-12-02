import React, { useState } from 'react'
import Card2 from './Card2';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import img from "../images/cartfinal.png"

const Cart = () => {


  var total=0;
  var freq1=0;
  const cartitems=useSelector(store=>store.cart.items);
  const uniquecartitems = [...new Set(cartitems)];
  const freq=useSelector(store=>store.cart.itemQuantities);
  return (
    <div className='dark:bg-[#0d1117] dark:text-white py-10 font-Open'>
        <div>
          {
              uniquecartitems.length!==0?
              (
                  uniquecartitems.map((cartitem)=>{
                    freq1+=freq[cartitem?.info?.id];
                    cartitem?.info?.price?(total=total+(parseInt(cartitem?.info?.price)/100)*freq[cartitem?.info?.id]):(total+=(130*freq[cartitem?.info?.id]))
                    return <Card2 cartitem={cartitem}/>
                  })
              ):
              (<div className='flex flex-col items-center py-10 dark:text-white  '>
              <img src={img} className='w-[400px]'/>
              <p className=' font-bold text-2xl'>Oops... Cart is empty</p>
              <p className='text-[#78716c]'>Feeling Hungry...</p>
              <Link to="/">
                <button className='mt-4 rounded-full text-white border-2 p-2 text-xl bg-[#ff2400] px-6 dark:border-slate-700'>Order Now</button>
              </Link>
            </div>)
          }
        </div>
        <div>
          {
            cartitems.length!==0?
            (<div className='text-center text-2xl my-5'>
              <p>Total Items: {freq1}</p>
              <p>Total Price: ₹{total}</p>
            </div>):
            (<p className='dark:text-black text-white'></p>)
          }
        </div>
    </div>
  )
}

export default Cart
