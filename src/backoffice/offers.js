
import { Wrapper, ColumnWrapper, InlineWrapper } from '../utils/components/wrapper'
import { StyledContainer } from '../utils/components/containers'
import { Button } from 'semantic-ui-react'
import { useState } from 'react/cjs/react.development'
import { request } from '../utils/functions/request'
import { GLOBAL } from '../utils/functions/GLOBAL'

export const BackofficeOffers = () => {
    const [offers, setOffer] = useState([])

    useState(() => {
        request(GLOBAL.URL + '/Offer/All', 'GET').then((res) => {
            if (res.status === 201) {
                setOffer(res.offers)
            }
        })
    }, [])

    console.log(offers)

    return (
        <Wrapper title="Offers">
            <ColumnWrapper>
                {offers.map((offer, i) => <OfferLine key={i} idOffer={offer.idOffer} date={offer.dateProposition} price={offer.price} />)}

            </ColumnWrapper>
        </Wrapper>
    )
}

const OfferLine = ({ idOffer, date, model, brand, price }) => {
    const [clicked, setClicked] = useState(false)

    const acceptOffer = (id) => {
        console.log('accepted')
    }

    const denyOffer = (id) => {
        console.log('denied')
    }

    const newOffer = (id) => {
        const price = prompt('New Price')
        const comment = prompt('Comment')

    }

    return (
        <StyledContainer>
            <div className="offer-backoffice"><span>{date}</span><span>Model: {model}</span><span>Brand: {brand}</span><span>Price: {price}€</span><span style={{ flex: 2 }}>{clicked ? <><Button content="Accept" onClick={acceptOffer.bind(this, idOffer)} /><Button content="Counter Offer" onClick={newOffer.bind(this, idOffer)} /><Button content="Deny" onClick={denyOffer.bind(this, idOffer)} /></> : <Button content="Answer" onClick={() => setClicked(true)} />}</span></div>
        </StyledContainer>)
}