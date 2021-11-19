import { registerRootComponent } from 'expo'
import React from 'react'
import { View, Text } from 'react-native'
import App from './App'
import CartProvider from './src/context/cartProvider'
import DateProvider from './src/context/dateProvider'
import OrderProvider from './src/context/orderProvider'
import UserProvider from './src/context/userProvider'

const Root: React.FC = () => {
    return (
        <UserProvider>
          <DateProvider>
            <OrderProvider>
              <CartProvider>
                <App/>
              </CartProvider>
            </OrderProvider>
          </DateProvider>
        </UserProvider>
        )
}

export default registerRootComponent(Root)
