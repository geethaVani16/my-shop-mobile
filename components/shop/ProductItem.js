import React from 'react'

import { View, StyleSheet, Text, Image, Button, TouchableOpacity, Platform, TouchableNativeFeedback } from "react-native"
import Colors from '../../constants/Colors'



const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchable} >

                <TouchableCmp onPress={props.onViewDetail} useForeground >
                    <View>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: props.image }} style={styles.img} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title} >{props.title}</Text>
                            <Text style={styles.price} >$ {props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button color={Colors.primary} title='view Details' onPress={props.onViewDetail} />
                            <Button color={Colors.primary} title='To Cart' onPress={props.onAddToCart} />
                        </View>
                    </View>

                </TouchableCmp>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: 'hidden'

    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily:'open-sans-bold',
        marginVertical:2
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily:'open-sans'

    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        marginLeft:10,
        marginRight:20

    },
    details: {
        alignItems: 'center',
        height: '15%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    }

})

export default ProductItem

