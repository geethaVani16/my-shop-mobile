import React,{ useEffect, useState } from 'react'

import { View, StyleSheet,ActivityIndicator, Platform, FlatList} from "react-native"
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import OrderItem from '../../components/shop/orderItem'
import CustomHeaderButton from '../../components/shop/UI/headerButton'
import { useSelector, useDispatch } from 'react-redux';




const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders)
    const dispatch=useDispatch()


    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
          setIsLoading(false);
        });
      }, [dispatch]);
    
      if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
      }
    
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
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default OrderScreen

