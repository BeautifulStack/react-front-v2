import {
    InlineWrapper,
    ColumnWrapper,
    Wrapper,
} from '../../utils/components/wrapper'
import { Icon, Button } from 'semantic-ui-react'

import { StyledContainer } from '../../utils/components/containers'
import { CartLine } from '../cart/cart'
import { useState, useEffect } from 'react/cjs/react.development'
import { request } from '../../utils/functions/request'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { OrderPDF } from '../../utils/components/pdf'
import { PDFDownloadLink } from '@react-pdf/renderer';

import { useTranslation } from 'react-i18next'


export const Order = () => {
    const [t] = useTranslation('common')

    const [orders, setOrders] = useState([])
    const [ord, setOrd] = useState(null)

    useEffect(() => {
        request(GLOBAL.URL + '/Order/', 'GET').then(resp => setOrders(resp.orders))
    }, [])

    const getOrder = async (id) => {
        request(GLOBAL.URL + '/Order/' + id, 'GET').then(resp => setOrd(resp.order))
    }


    return (
        <Wrapper title={t('orders')}>
            <InlineWrapper>
                <ColumnWrapper>
                    {orders.length === 0 ? <span>{t('no_orders')} :(</span> : orders.map(order => <OrderLine
                        orderId={order.idBuy}
                        totalprice={order.totalPrice + '€'}
                        status={order.payementStatus}
                        date={order.date}
                        onClick={() => getOrder(order.idBuy)}
                    />)}
                </ColumnWrapper>
                <StyledContainer>
                    {ord === null ? <h2>Select order...</h2> :
                        <OrderResume
                            orderId={ord.idBuy}
                            products={ord.products ? ord.products : []}
                            status={ord.deliveryStatus}
                            totalprice={ord.totalPrice + "€"}
                            date={ord.date}
                            shippingAddress={ord.shippingAddress}
                        />
                    }
                </StyledContainer>
            </InlineWrapper>
        </Wrapper>
    )
}

const OrderLine = ({ orderId, totalprice, status, date, onClick }) => {
    const [t] = useTranslation('common')

    return (
        <StyledContainer pointer onClick={onClick}>
            <InlineWrapper>
                <span>
                    {t('order')} <b>#{orderId}</b>
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
    const [t] = useTranslation('common')

    return (
        <ColumnWrapper>
            <h5>{t('order')} #{orderId}</h5>
            <InlineWrapper>
                <span>
                    {t('total_price')}: <b>{totalprice}</b>
                </span>
                <span>
                    Status: <b>{status}</b>
                </span>
            </InlineWrapper>
            {products.map(( product ) => (
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
                        <span>{t('bill')}</span>
                    </Button>
                }
            </PDFDownloadLink>
        </ColumnWrapper>
    )
}
