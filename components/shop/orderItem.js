import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from "react-native"
import Colors from '../../constants/Colors'
import CardItem from '../shop/CartItem'

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>{props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                title='show Details'
                color={Colors.primary}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map(item => {
                     
                        return <CardItem
                            key={item.productId}
                            quantity={item.quantity}
                            amount={item.productPrice}
                            title={item.productTitle}
                        />
                    }

                    )}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        margin: 20,
        alignItems: 'center',
        padding: 10
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
})

export default OrderItem

