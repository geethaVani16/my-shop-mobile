import React from 'react'

import { View, StyleSheet, Text, Platform } from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import OrderItem from '../../components/shop/orderItem'
import CustomHeaderButton from '../../components/shop/UI/headerButton'

const OrderScreen = props => {
    const orders = useSelector(state => state.orders.orders)
    return (
        <View>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData => {
                    console.log(itemData,"data")
                    return <OrderItem
                        amount={itemData.item.totalAmount.toFixed()}
                        date={itemData.item.readableDate}
                        items={itemData.item.items}
                    />
                }
                }
            />
        </View>
    )
}

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
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

})

export default OrderScreen

