import {
    InlineWrapper,
    ColumnWrapper,
    Wrapper,
} from '../../utils/components/wrapper'

// import { useState } from 'react'

import { Input } from 'semantic-ui-react'

import { StyledContainer } from '../../utils/components/containers'

import { Button } from 'semantic-ui-react'
import {
    CardElement,
    // useStripe, useElements
} from '@stripe/react-stripe-js'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export const Cart = () => {
    // const stripe = useStripe()
    // const elements = useElements()
    // const [disabled, setDisabled] = useState(true)
    // const [delivery, setDelivery] = useState(null)
    // const [success, setSuccess] = useState(false)
    // const [modal, setModal] = useState(null)

    const stripePromise = loadStripe(
        'pk_test_51IoECAGhzmo20Me7YY9TfXe3cWzECpBBD1hfobRydR8DnnYdWGo50Rs2UMm9Mxbi9fYa339vatoeD28Gr5lcZLOV00lP9Otpka'
    )

    const cardStyle = {
        style: {
            base: {
                fontFamily: 'Ubuntu, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',

                iconColor: '#E6E6E6',
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
        hidePostalCode: true,
    }

    // const handleChange = async (event) => {
    //     // Listen for changes in the CardElement
    //     // and display any errors as the customer types their card details
    //     setDisabled(event.empty)
    // }

    return (
        <Wrapper title='Cart'>
            <InlineWrapper>
                <ColumnWrapper>
                    <CartLine model='Iphone X' brand='Apple' price='1862€' />
                    <CartLine model='Iphone X' brand='Apple' price='1862€' />
                    <CartLine model='Iphone X' brand='Apple' price='1862€' />
                    <CartLine model='Iphone X' brand='Apple' price='1862€' />
                </ColumnWrapper>
                <ColumnWrapper>
                    <StyledContainer>
                        <ColumnWrapper>
                            <h5>Your Order</h5>
                            <InlineWrapper middle>
                                <span>Total Price: 16511€</span>
                                <Button color='yellow'>Checkout</Button>
                            </InlineWrapper>
                        </ColumnWrapper>
                    </StyledContainer>
                    <StyledContainer>
                        <ColumnWrapper>
                            <h5>Payment</h5>

                            <Input
                                placeholder='Address...'
                                className='input-navbar'
                                style={{ width: '100%' }}
                                // onKeyDown={(e) => {
                                //     if (e.key === 'Enter') submitSearch()
                                // }}
                                // onChange={(e) => setSearch(e.target.value)}
                            />

                            <div style={{ margin: '1em' }}>
                                <Elements stripe={stripePromise}>
                                    <CardElement
                                        options={cardStyle}
                                        // onChange={handleChange}
                                    />
                                </Elements>
                            </div>
                            <Button color='yellow'>Pay</Button>
                        </ColumnWrapper>
                    </StyledContainer>
                </ColumnWrapper>
            </InlineWrapper>
        </Wrapper>
    )
}

export const CartLine = ({ model, price, brand }) => {
    return (
        <StyledContainer>
            <InlineWrapper>
                <span>
                    Brand: <b>{brand}</b>
                </span>
                <span>
                    Model: <b>{model}</b>
                </span>
                <span>
                    <b>{price}</b>
                </span>
            </InlineWrapper>
        </StyledContainer>
    )
}
