import React from 'react'
import { View, StyleSheet, Text, FlatList, Platform } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cartAction'
import {  HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/shop/UI/headerButton'


const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData => {
                    return (
                        <ProductItem
                            image={itemData.item.imageUrl}
                            title={itemData.item.title}
                            price={itemData.item.price}
                            description={itemData.item.description}
                            onViewDetail={() => {
                                props.navigation.navigate('ProductDetail', {
                                    productId: itemData.item.id,
                                    productTitle: itemData.item.title
                                }
                                )
                            }}
                            onAddToCart={() => { dispatch(addToCart(itemData.item)) }}
                        />
                    )

                }}

            />
        </View>

    )
}


ProductsOverViewScreen.navigationOptions = navData => {
    return {
        // headerTitle: 'All Products',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : "ios-cart"}
                onPress={() => { navData.navigation.navigate('cart') }}
            />

        </HeaderButtons>,
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android ' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}

                />

            </HeaderButtons>
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    }
})

export default ProductsOverViewScreen

