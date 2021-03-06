import React from 'react'

import { View, StyleSheet, Text, Image, ScrollView, Button } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import { addToCart } from '../../store/actions/cartAction'

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch()
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button title='Add to Cart' color={Colors.primary} onPress={() => { dispatch(addToCart(selectedProduct)) }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>

        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',

    }
})

export default ProductDetailScreen

