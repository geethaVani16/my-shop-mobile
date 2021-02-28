
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import {createSw}
import ProductsOverViewScreen from '../screens/shop/productsOverViewScreen';
import Colors from '../constants/Colors'
import { Platform } from 'react-native';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
}
const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    cart: CartScreen

}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'andriod' ? 'md-cart' : 'ios-cart'}
                size={23}
                Colors={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})


const orderNavigator = createStackNavigator({
    order: OrderScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'andriod' ? 'md-list' : 'ios-list'}
                size={23}
                Colors={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})

const adminNavigator = createStackNavigator({
    userProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'andriod' ? 'md-create' : 'ios-create'}
                size={23}
                Colors={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})





const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const shopNavigator = createDrawerNavigator({
    products: ProductsNavigator,
    orders: orderNavigator,
    Admin: adminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary,
    }
})


const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: shopNavigator
});

export default createAppContainer(MainNavigator)