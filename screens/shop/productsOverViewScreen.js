import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, Text, FlatList, Platform, Button, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cartAction'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/shop/UI/headerButton'
import Colors from '../../constants/Colors'
import { fetchProducts } from '../../store/actions/productAction'





const ProductsOverViewScreen = props => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true);
        try {
            await dispatch(fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);

    }, [dispatch, setIsLoading, setError])


    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadProducts
        );

        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    useEffect(() => {
        loadProducts();
    }, [dispatch]);


    const onSelectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        }
        )
    }
    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button
                    title="Try again"
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        );
    }


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products Found.May be add </Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={loadProducts}
                refreshing={isRefreshing}
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData => {
                    return (
                        <ProductItem
                            image={itemData.item.imageUrl}
                            title={itemData.item.title}
                            price={itemData.item.price}
                            description={itemData.item.description}
                            onSelect={() => {
                                onSelectItemHandler(itemData.item.id, itemData.item.title)
                            }}
                        >
                            <Button
                                color={Colors.primary}
                                title='view Details'
                                onPress={() => onSelectItemHandler(itemData.item.id, itemData.item.title)}
                            />
                            <Button color={Colors.primary} title='To Cart' onPress={() => { dispatch(addToCart(itemData.item)) }} />
                        </ProductItem>
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
    },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }

})

export default ProductsOverViewScreen

