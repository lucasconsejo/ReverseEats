import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native"
import { CartContext } from "../../../../context/cartProvider";
import { CartRenderProps } from "../../../../types/props.types";
import CartBtn from "./CartBtn";
import CartItems from "./CartItems";

const CartRender: React.FC<CartRenderProps> = ({ restaurant, navigation }) => {
    const { cartState } = useContext(CartContext);
    const nbFood = cartState.reduce((a, b) => a + (b.quantity || 0), 0);
    const caculTotal = cartState.reduce((a, b) => a + (b.totalPrice || 0), 0);
    const [showCart, setShowCart] = useState<boolean>(false);

    useEffect(() => {
        !cartState.length && setShowCart(false);
    }, [cartState]);

    return cartState.length ? (
        <View>
            {showCart && (
                <CartItems 
                    title={restaurant.name}
                    cartState={cartState}
                    setShowCart={setShowCart}
                    navigation={navigation}
                    caculTotal={caculTotal}
                />
            )}
            <CartBtn text={showCart ? "Passer au paiement" : `Voir le panier (${nbFood})`} setShowCart={setShowCart} />
        </View>
    ) : null;
}

export default CartRender;
