import {
    InlineWrapper,
    ColumnWrapper,
    Wrapper,
} from '../../utils/components/wrapper'

import { Input } from 'semantic-ui-react'

import { StyledContainer } from '../../utils/components/containers'

import { Button } from 'semantic-ui-react'
import {
    CardElement,
    useStripe, useElements
} from '@stripe/react-stripe-js'


import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react/cjs/react.development'
import { request } from '../../utils/functions/request'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { useHistory } from 'react-router-dom'

export const Cart = () => {

    const [shoppingCart, setShoppingCart] = useState([])




    const stripePromise = loadStripe(
        'pk_test_51IoECAGhzmo20Me7YY9TfXe3cWzECpBBD1hfobRydR8DnnYdWGo50Rs2UMm9Mxbi9fYa339vatoeD28Gr5lcZLOV00lP9Otpka'
    )

    const updateCart = () => {
        request(GLOBAL.URL + '/Product/Cart', 'GET').then(res => setShoppingCart(res.products))

    }
    useEffect(() => {
        updateCart()
    }, [])



    return (
        <Wrapper title='Cart'>
            <InlineWrapper>
                <ColumnWrapper>
                    {shoppingCart.length === 0 ? <span>No product in Cart</span> : shoppingCart.map(prod => <CartLine deletable model={prod.modelName} brand={prod.brandName} price={prod.resellPrice + '€'} onClick={() => {
                        request(GLOBAL.URL + '/Product/Remove', 'POST', { idProduct: prod.idProduct }).then(() => updateCart())

                    }} />)}
                </ColumnWrapper>
                <ColumnWrapper>
                    <StyledContainer>
                        <ColumnWrapper>
                            <h5>Your Order</h5>
                            <InlineWrapper middle>
                                <span>Total Price: {shoppingCart.reduce((acc, obj) => { return acc + parseInt(obj.resellPrice) }, 0)}€</span>
                            </InlineWrapper>
                        </ColumnWrapper>
                    </StyledContainer>
                    <StyledContainer>
                        <ColumnWrapper>
                            <h5>Payment</h5>
                            <Elements stripe={stripePromise}>
                                <PayementForm />




                            </Elements>
                        </ColumnWrapper>
                    </StyledContainer>
                </ColumnWrapper>
            </InlineWrapper>
        </Wrapper>
    )
}

const PayementForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [address, setAddress] = useState('')
    const history = useHistory()

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }


        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        })

        if (error) {
            console.log('[error]', error)
        } else {
            console.log('[PaymentMethod]', paymentMethod)
            const res = await request(
                GLOBAL.URL + '/Payment/Create',
                'POST',
                { payment_method: paymentMethod.id, delivery_address: address }
            )
            history.push('/order')

        }
    }

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

    return <><Input
        placeholder='Address...'
        className='input-navbar'
        style={{ width: '100%' }}

        onChange={(e) => setAddress(e.target.value)}
    />

        <div style={{ margin: '1em' }}>

            <CardElement
                options={cardStyle}
            />

        </div>
        <Button color='yellow' disabled={address.length === 0} onClick={handleSubmit}>Pay</Button>
    </>
}

export const CartLine = ({ model, price, brand, onClick, deletable }) => {
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
                    <b>{price}€</b>
                </span>
                {deletable ? <span style={{ color: 'red', cursor: 'pointer' }} onClick={onClick}>
                    <b>Remove</b>
                </span> : <></>}

            </InlineWrapper>
        </StyledContainer>
    )
}
