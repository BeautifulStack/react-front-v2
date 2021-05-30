import {
    InlineWrapper,
    ColumnWrapper,
    Wrapper,
} from '../../utils/components/wrapper'

import { StyledContainer } from '../../utils/components/containers'
import { CartLine } from '../cart/cart'

export const Order = () => {
    return (
        <Wrapper title='Orders'>
            <InlineWrapper>
                <ColumnWrapper>
                    <OrderLine
                        orderId='1385'
                        totalprice='2513€'
                        status='finished'
                        date='30/05/2021 16h30'
                    />
                    <OrderLine
                        orderId='1385'
                        totalprice='2513€'
                        status='finished'
                        date='30/05/2021 16h30'
                    />
                    <OrderLine
                        orderId='1385'
                        totalprice='2513€'
                        status='finished'
                        date='30/05/2021 16h30'
                    />
                    <OrderLine
                        orderId='1385'
                        totalprice='2513€'
                        status='finished'
                        date='30/05/2021 16h30'
                    />
                </ColumnWrapper>
                <StyledContainer>
                    <OrderResume
                        orderId='1384'
                        products={[
                            {
                                model: 'Iphone X',
                                brand: 'Apple',
                                price: '1348€',
                            },
                            {
                                model: 'Iphone X',
                                brand: 'Apple',
                                price: '1348€',
                            },
                            {
                                model: 'Iphone X',
                                brand: 'Apple',
                                price: '1348€',
                            },
                            {
                                model: 'Iphone X',
                                brand: 'Apple',
                                price: '1348€',
                            },
                        ]}
                        status='Sent'
                        totalprice='1348€'
                    />
                </StyledContainer>
            </InlineWrapper>
        </Wrapper>
    )
}

const OrderLine = ({ orderId, totalprice, status, date }) => {
    return (
        <StyledContainer>
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

export const OrderResume = ({ orderId, products, totalprice, status }) => {
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
                    model={product.model}
                    brand={product.brand}
                    price={product.price}
                />
            ))}
        </ColumnWrapper>
    )
}
