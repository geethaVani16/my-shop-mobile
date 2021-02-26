import React from 'react'

import { StyleSheet, FlatList, Button } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/shop/UI/headerButton'
import Colors from '../../constants/Colors'
import { deleteProduct } from '../../store/actions/productAction'




const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()


    const editProductHandler = (id, title) => {
        props.navigation.navigate('EditProduct', {
            productId: id
        }
        )
    }
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
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title='Edit'
                        onPress={() => editProductHandler(itemData.item.id)}
                    />
                    <Button color={Colors.primary} title='Delete' onPress={() => dispatch(deleteProduct(itemData.item.id))} />
                </ProductItem>
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
        },
        headerRight: () => {
            return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='edit'
                    iconName={Platform.OS === 'android ' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct')
                    }}

                />

            </HeaderButtons>


        }


    }
}



export default UserProductsScreen

