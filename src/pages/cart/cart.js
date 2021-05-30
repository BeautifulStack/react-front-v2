import {
    InlineWrapper,
    ColumnWrapper,
    Wrapper,
} from './../../utils/components/wrapper'

import { StyledContainer } from '../../utils/components/containers'

export const Cart = () => {
    return (
        <Wrapper title='Cart'>
            <InlineWrapper>
                <ColumnWrapper>
                    <Order
                        orderId='1385'
                        totalprice='2513€'
                        status='finished'
                        date='30/05/2021 16h30'
                    />
                    <Order
                        orderId='1385'
                        totalprice='2513€'
                        status='finished'
                        date='30/05/2021 16h30'
                    />
                    <Order
                        orderId='1385'
                        totalprice='2513€'
                        status='finished'
                        date='30/05/2021 16h30'
                    />
                    <Order
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
                        ]}
                        status='Sent'
                        totalprice='1348€'
                    />
                </StyledContainer>
            </InlineWrapper>
        </Wrapper>
    )
}

const Order = ({ orderId, totalprice, status, date }) => {
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
                <StyledContainer>
                    <InlineWrapper>
                        <span>
                            Brand: <b>{product.brand}</b>
                        </span>
                        <span>
                            Model: <b>{product.model}</b>
                        </span>
                        <span>
                            Price: <b>{product.price}</b>
                        </span>
                    </InlineWrapper>
                </StyledContainer>
            ))}
        </ColumnWrapper>
    )
}
