import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import phoneLogo from "./../../images/logo192.png";

export const OrderPDF = ({ id, products, date, totalPrice }) => {
    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E4E4E4',
            height: 'auto'
        },
        section: {
            fontSize: '16px',
            margin: 10,
            padding: 10,
        },
        footer: {
            fontSize: '12px',
            alignSelf: 'center',
            margin: '12px'
        },
        product: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '6px 24px',
            borderRadius: '5px',
            padding: '12px',
            backgroundColor: 'rgba(0,0,0,0.05)'
        },
        img: {
            height: "100px",
            width: "100px"
        },
        flexxer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }

    });
    console.log(products)

    return (
        <Document>
            <Page size="A4" wrap style={styles.page}>
                <View style={styles.flexxer}>
                    <Image src={phoneLogo} style={styles.img} />
                </View>
                <View style={styles.section}>
                    <Text>Facture #{id}</Text>
                </View>

                <View style={styles.section}>
                    <Text>Order Date: <b>{date}</b></Text>
                </View>
                <View style={styles.product} >
                    <Text>Products</Text>
                </View>
                {products.map((product, i) =>
                    <View style={styles.product} key={i}>
                        <Text>Model: {product.modelName}</Text>
                        <Text>Brand: {product.brandName}</Text>
                        <Text>Price: {product.price}</Text>
                    </View>
                )}
                <View style={styles.product}>
                    <Text>Total Price: <b>{totalPrice}</b></Text>
                </View>
                <View style={styles.footer}>
                    <Text>Thanks for your order and help the planet !</Text>

                </View>
            </Page>
        </Document>
    );
}
