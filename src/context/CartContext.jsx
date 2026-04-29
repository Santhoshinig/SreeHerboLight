import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const isFav = prev.find(item => item.id === product.id)
      if (isFav) return prev.filter(item => item.id !== product.id)
      return [...prev, product]
    })
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const wishlistCount = wishlist.length

  return (
    <CartContext.Provider value={{ 
      cart, wishlist, addToCart, removeFromCart, clearCart, toggleWishlist,
      cartCount, cartTotal, wishlistCount 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
