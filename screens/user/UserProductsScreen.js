import React from 'react'

import { StyleSheet, FlatList } from "react-native"
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import {  HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/shop/UI/headerButton'

const UserProductsScreen = () => {
    const userProducts = useSelector(state => state.products.userProducts)
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    description={itemData.item.description}
                    onViewDetail={() => {}}
                    onAddToCart={() => {}}
                />
            )}
        />


    )
}


UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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

})

export default UserProductsScreen

