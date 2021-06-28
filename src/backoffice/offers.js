
import { Wrapper, ColumnWrapper } from '../utils/components/wrapper'
import { StyledContainer } from '../utils/components/containers'
import { Button } from 'semantic-ui-react'
import { useState } from 'react/cjs/react.development'
import { request } from '../utils/functions/request'
import { GLOBAL } from '../utils/functions/GLOBAL'

import { useTranslation } from 'react-i18next'

export const BackofficeOffers = () => {
    const [t] = useTranslation('common')

    const [offers, setOffer] = useState([])

    useState(() => {
        request(GLOBAL.URL + '/Offer/All', 'GET').then((res) => {
            if (res.status === 201) {
                setOffer(res.offers)
            }
        })
    }, [])

    let arreangedOffer = []
    offers.forEach((offer) => {
        const elem = arreangedOffer.find((aroffer) => aroffer.idSell === offer.idSell)
        if (!elem) { arreangedOffer.push(offer) }
        else if (elem.order < offer.order) {
            arreangedOffer = arreangedOffer.filter((aroffer) => aroffer.idSell !== offer.idSell)
            arreangedOffer.push(offer)
        }
    })

    return (
        <Wrapper title={t('offers')}>
            <ColumnWrapper>
                {arreangedOffer.map((offer, i) => <OfferLine key={i} idSell={offer.idSell} idOffer={offer.idOffer} idUser={offer.idUser} date={offer.dateProposition} price={offer.price} />)}

            </ColumnWrapper>
        </Wrapper>
    )
}

const OfferLine = ({ idSell, date, model, brand, price, idOffer, idUser }) => {
    const [clicked, setClicked] = useState(false)

    const acceptOffer = () => {
        request(GLOBAL.URL + '/Offer/AdminProposition', 'POST', { idOffer, idSell, status: "accept" }).then(() => window.location.reload())
    }

    const denyOffer = () => {
        request(GLOBAL.URL + '/Offer/AdminProposition', 'POST', { idOffer, idSell, status: "deny" }).then(() => window.location.reload())
    }

    const newOffer = () => {
        const price = prompt('New Price')
        const comment = prompt('Comment')

        request(GLOBAL.URL + '/Offer/AdminProposition', 'POST', { idOffer, idSell, status: "counter", idUser, comment, price }).then(() => window.location.reload())
    }

    return (
        <StyledContainer>
            <div className="offer-backoffice"><span>{date}</span><span>Model: {model}</span><span>Brand: {brand}</span><span>Price: {price}€</span><span style={{ flex: 2 }}>{clicked ? <><Button content="Accept" onClick={acceptOffer.bind(this, idSell)} /><Button content="Counter Offer" onClick={newOffer.bind(this, idSell)} /><Button content="Deny" onClick={denyOffer.bind(this, idSell)} /></> : <Button content="Answer" onClick={() => setClicked(true)} />}</span></div>
        </StyledContainer>)
}