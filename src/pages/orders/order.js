import {
    InlineWrapper,
    ColumnWrapper,
    Wrapper,
} from '../../utils/components/wrapper'
import { Input, Icon, Button, Dropdown } from 'semantic-ui-react'

import { StyledContainer } from '../../utils/components/containers'
import { CartLine } from '../cart/cart'
import { useState, useEffect } from 'react/cjs/react.development'
import { request } from '../../utils/functions/request'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { OrderPDF } from '../../utils/components/pdf'
import { PDFDownloadLink } from '@react-pdf/renderer';

export const Order = () => {
    const [orders, setOrders] = useState([])
    const [ord, setOrd] = useState({})

    useEffect(() => {
        request(GLOBAL.URL + '/Order/', 'GET').then(resp => setOrders(resp.orders))
    }, [])

    const getOrder = async (id) => {
        request(GLOBAL.URL + '/Order/' + id, 'GET').then(resp => setOrd(resp.order))
    }

    console.log(ord)

    return (
        <Wrapper title='Orders'>
            <InlineWrapper>
                <ColumnWrapper>
                    {orders.length === 0 ? <span>No orders :(</span> : orders.map(order => <OrderLine
                        orderId={order.idBuy}
                        totalprice={order.totalPrice + '€'}
                        status={order.payementStatus}
                        date={order.date}
                        onClick={() => getOrder(order.idBuy)}
                    />)}
                </ColumnWrapper>
                <StyledContainer>
                    <OrderResume
                        orderId={ord.idBuy}
                        products={ord.products ? ord.products : []}
                        status={ord.deliveryStatus}
                        totalprice={ord.totalPrice + "€"}
                        date={ord.date}
                        shippingAddress={ord.shippingAddress}
                    />
                </StyledContainer>
            </InlineWrapper>
        </Wrapper>
    )
}

const OrderLine = ({ orderId, totalprice, status, date, onClick }) => {
    return (
        <StyledContainer pointer onClick={onClick}>
            <InlineWrapper>
                <span>
                    Order <b>#{orderId}</b>
                </span>
                <span>
                    <b>{totalprice}</b>
                </span>
                <span>
                    <b>{status}</b>
                </span>
                <span>
                    <b>{date}</b>
                </span>
            </InlineWrapper>
        </StyledContainer>
    )
}

export const OrderResume = ({ orderId, products, totalprice, status, shippingAddress, date }) => {
    return (
        <ColumnWrapper>
            <h5>Order #{orderId}</h5>
            <InlineWrapper>
                <span>
                    Total Price: <b>{totalprice}</b>
                </span>
                <span>
                    Status: <b>{status}</b>
                </span>
            </InlineWrapper>
            {products.map((product, i) => (
                <CartLine
                    model={product.modelName}
                    brand={product.brandName}
                    price={product.price}
                />
            ))}
            <PDFDownloadLink document={<OrderPDF filename="facture" id={orderId} totalPrice={totalprice} products={products} date={date} shippingAddress={shippingAddress} />} fileName="facture.pdf">

                {({ loading }) =>
                    <Button
                        color={
                            'yellow'
                        }
                        loading={loading}
                    >
                        <Icon size='large' name='download' />
                        <span>Facture</span>
                    </Button>
                }
            </PDFDownloadLink>
        </ColumnWrapper>
    )
}
