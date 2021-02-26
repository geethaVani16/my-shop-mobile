import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Icon, Left, Body } from 'native-base';
const CardView = ({ image, title, price, description }) => {
    return (
        <Container style={styles.cardContainer}>
            <Content>
                <Card style={{ flex: 0 }}>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{title}</Text>
                                <Text note>April 15, 2016</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{ uri: image }} style={{ height: 200, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Body>
                                <Text>
                                    {description}
                                </Text>
                            </Body>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon name="star-half" />
                            <Text>{price}</Text>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );

}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        width: '100%',
        height: '60%',
        overflow: 'hidden'

    }
})

export default CardView