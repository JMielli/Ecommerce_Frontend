
import { FaShoppingCart } from "react-icons/fa";
import React from 'react'

import styles from './Cart.module.css'

const Cart = () => {
  return (
      <FaShoppingCart className={styles.cart}/>
  )
}

export default Cart