import React from 'react'

import { View, StyleSheet, Text, Platform, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'

const CartItem = ({ quantity, title, price, sum,deletable, onRemove }) => {
    return (
        <View style={styles.CartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity}</Text>
                <Text style={styles.mainText}>{title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${price}</Text>
                {deletable && <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CartItem: {
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20,

    }
})

export default CartItem

