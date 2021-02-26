import React from 'react'

import { View, StyleSheet, Text, Button } from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import Colors from '../../constants/Colors'
import { removeFromCart } from '../../store/actions/cartAction'
import { addOrder } from '../../store/actions/orderAction'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/shop/UI/headerButton'


const CartScreen = props => {
    const dispatch = useDispatch()
    const cartAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1)
    })

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:<Text style={styles.amount}>$ {cartAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    title='Order Now'
                    color={Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={()=>dispatch(addOrder(cartItems,cartAmount))}
                />
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={data =>
                        <CartItem
                            quantity={data.item.quantity}
                            title={data.item.productTitle}
                            price={data.item.productPrice}
                            sum={data.item.sum}
                            deletable
                            onRemove={() => { dispatch(removeFromCart(data.item.productId)) }}
                        />}


                />
            </View>


        </View>
    )
}


CartScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Cart',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 10, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white',

    },
    amount: { color: Colors.primary },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }

})

export default CartScreen

