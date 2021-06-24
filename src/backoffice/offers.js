
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



    return (
        <Wrapper title="Offers">
            <ColumnWrapper>
                {offers.map((offer, i) => <OfferLine key={i} date={offer.dateProposition} price={offer.price} />)}

            </ColumnWrapper>
        </Wrapper>
    )
}

const OfferLine = ({ date, model, brand, price }) => {
    const [clicked, setClicked] = useState(false)


    return (
        <StyledContainer>
            <div className="offer-backoffice"><span>{date}</span><span>Model: {model}</span><span>Brand: {brand}</span><span>Price: {price}€</span><span>{clicked ? <><Button content="Accept" /><Button content="Deny" /></> : <Button content="Answer" onClick={() => setClicked(true)} />}</span></div>
        </StyledContainer>)
}