import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Icon,
    Button,
    Step,
    Select,
    TextArea,
    Form,
    Input,
} from 'semantic-ui-react'
import { StyledContainer } from '../../utils/components/containers'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { request } from '../../utils/functions/request'
import {
    ColumnWrapper,
    InlineWrapper,
    Wrapper,
} from './../../utils/components/wrapper'
import { OfferPDF } from '../../utils/components/pdf'
import { PDFDownloadLink } from '@react-pdf/renderer';

export const Sells = () => {
    const history = useHistory()

    const [offer, setOffer] = useState([])
    const [clicked, setClicked] = useState(false)

    const [offerProps, setOfferProps] = useState({
        idSell: -1
    })

    const [propositions, setProposition] = useState([])

    useEffect(() => {
        request(GLOBAL.URL + '/Offer/', 'GET').then((response) => {
            setOffer(response.offers)
        })
    }, [])

    const updateProposition = () => {
        setClicked(false)
        if (offerProps.idSell !== -1) {
            request(GLOBAL.URL + '/Offer/' + offerProps.idSell, 'GET').then((response) => {
                setProposition(response.proposition)
            })

        }
    }

    useEffect(() => {
        updateProposition()
    }, [offerProps])


    const acceptOffer = () => {
        const lastOffer = propositions[0];
        request(GLOBAL.URL + "/Offer/Proposition/" + lastOffer.idOffer, 'POST', { status: "accept" }).then(() => updateProposition())
    }

    const denyOffer = () => {
        const lastOffer = propositions[0];
        request(GLOBAL.URL + "/Offer/Proposition/" + lastOffer.idOffer, 'POST', { status: "deny" }).then(() => updateProposition())
    }

    const counterOffer = () => {
        const comment = prompt('Your message')
        const price = prompt("You new Price")
        const lastOffer = propositions[0];
        request(GLOBAL.URL + "/Offer/Proposition/" + lastOffer.idOffer, 'POST', { status: "counter", comment, price }).then(() => updateProposition())
    }

    return (
        <Wrapper title='Your Sells'>
            <InlineWrapper>
                <ColumnWrapper>
                    <Button
                        color='yellow'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            history.push('/sells/new')
                        }}
                    >
                        <Icon name='add' />
                        <span>New</span>
                    </Button>
                    {offer.length > 0 ?
                        offer.map((off, i) => <OfferLine
                            offerId={'#' + off.idSell}
                            status={off.status}
                            date={off.dateProposition}
                            onClick={() => setOfferProps({ idSell: off.idSell, status: off.status, date: off.dateProposition, location: off.location, address: off.addresse })}
                        />)
                        : <span>No sell for the moment</span>
                    }

                </ColumnWrapper>
                <StyledContainer>
                    <ColumnWrapper>
                        <h3>Offer #{offerProps.idSell}</h3>
                        <span>{offerProps.date}</span>
                        <span>
                            Status: <b>{offerProps.status}</b>
                        </span>
                        <PDFDownloadLink document={<OfferPDF filename="facture" id={offerProps.idSell} date={offerProps.date} shippingAddress={offerProps.location + " " + offerProps.address} />} fileName="facture.pdf">

                            {({ loading }) =>
                                loading ? 'Facture en cours de génération' : <Button
                                    color={
                                        'yellow'
                                    }
                                    style={{ marginTop: '1em' }}
                                >
                                    <Icon size='large' name='download' />
                                    <span>Feuille d'envoi</span>
                                </Button>
                            }
                        </PDFDownloadLink>
                        <div className='offerResumeHistory'>
                            <h5>History: </h5>
                            <div className='scroller'>
                                {propositions.length === 0 ? <span>No Offer</span> :
                                    propositions.map((pro, i) => <HistoryLine
                                        status={pro.status}
                                        date={pro.date}
                                        price={pro.price + '€'}
                                        comment={pro.comment}
                                    />)}

                                {/* <CounterOffer /> */}
                            </div>
                            {propositions.length !== 0 && propositions[0].proposedBy === "0" ? <span>We are examinating your offer</span> : <InlineWrapper>
                                {clicked ? <><Button color='yellow' onClick={acceptOffer}>Accept</Button>{' '}
                                    <Button onClick={counterOffer}>Counter Offer</Button>{' '}
                                    <Button color='red' onClick={denyOffer}>Deny</Button></> : <Button color='yellow' onClick={() => setClicked(true)}>Answer</Button>}

                            </InlineWrapper>}

                        </div>
                    </ColumnWrapper>
                </StyledContainer>
            </InlineWrapper>
        </Wrapper>
    )
}

const CounterOffer = () => {
    return (
        <ColumnWrapper>
            <Form style={{ marginBottom: '1em' }}>
                <TextArea placeholder='Tell us more' />
            </Form>
            <InlineWrapper>
                <Input placeholder='New Price...' />
                <Button>Send</Button>
            </InlineWrapper>
        </ColumnWrapper>
    )
}

const OfferLine = ({ offerId, status, date, price, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                cursor: 'pointer',
                alignSelf: 'stretch',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1em',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '5px',
                margin: '.5em 0',
            }}
        >
            <span>{offerId}</span>
            <span>{status}</span>
            <span>{date}</span>
            <span>{price}</span>
        </div>
    )
}

const HistoryLine = ({ status, date, price, comment }) => {
    return (
        <div

            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1em',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '5px',
                marginBottom: '1em',
            }}
        >
            <span>{date}</span>
            <span>{status}</span>
            <Icon name="zoom" onClick={() => alert("Our team said: " + comment)} style={{ cursor: "pointer" }} />
            <span>{price}</span>
        </div>
    )
}

export const NewSell = () => {
    const [model, setModel] = useState({
        modelId: -1,
        brandId: -1,
        categoryId: -1,
        images: [],
        description: '',
    })

    const [validate, setValidate] = useState([0, 0, 0, 0])

    const [active, setActive] = useState(0)

    const [fetchedDatas, setFetchedDatas] = useState({
        categories: [],
        brands: [],
        models: []
    })

    const sliderRef = useRef()
    const inputPhoto = useRef()

    const handleClickForm = () => {
        inputPhoto.current.click()
    }

    const slide = (e, a) => {
        const position = (sliderRef.current.scrollTopMax / 3) * e
        setActive(e)
        const newValidate = [...validate]
        newValidate[a] = 1
        setValidate(newValidate)
        console.log(sliderRef.current)
        sliderRef.current.scrollTo({ top: position, behavior: 'smooth' })
    }

    useEffect(() => {
        async function fetchData() {
            request(GLOBAL.URL + '/Category/').then((res) => {
                console.log(res)
                setFetchedDatas((data) => ({ ...data, categories: res.categories }))
            })
            request(GLOBAL.URL + '/Brand/').then((res) => {
                console.log(res)
                setFetchedDatas((data) => ({ ...data, brands: res.brands }))
            })
            request(GLOBAL.URL + '/Model/').then((res) => {
                console.log(res)
                setFetchedDatas((data) => ({ ...data, models: res.models }))
            })
        }
        fetchData()
    }, [])


    const fetchModelPossibilities = async () => {
        if (model.modelId === -1) return
        const res = await request(GLOBAL.URL + '/Model/' + model.modelId)
        console.log(res)
    }

    useEffect(() => {
        fetchModelPossibilities()
    }, [model])

    console.log(fetchedDatas)

    return (
        <div className='newSellPage'>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Step.Group vertical>
                    <Step
                        completed={validate[0] === 1}
                        active={active === 0}
                        onClick={slide.bind(this, 0)}
                    >
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>Model</Step.Title>
                            <Step.Description>
                                Choose your products's Model
                            </Step.Description>
                        </Step.Content>
                    </Step>
                    <Step
                        completed={validate[1] === 1}
                        active={active === 1}
                        onClick={slide.bind(this, 1)}
                    >
                        <Icon name='payment' />
                        <Step.Content>
                            <Step.Title>Photos</Step.Title>
                            <Step.Description>
                                Give us Photos and details
                            </Step.Description>
                        </Step.Content>
                    </Step>
                    <Step
                        completed={validate[2] === 1}
                        active={active === 2}
                        onClick={slide.bind(this, 2)}
                    >
                        <Icon name='payment' />
                        <Step.Content>
                            <Step.Title>Details</Step.Title>
                            <Step.Description>
                                Enter product Details
                            </Step.Description>
                        </Step.Content>
                    </Step>

                    <Step
                        completed={validate[3] === 1}
                        active={active === 3}
                        onClick={slide.bind(this, 3)}
                    >
                        <Icon name='info' />
                        <Step.Content>
                            <Step.Title>Confirm Order</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </div>
            <div className='newSellWindowWrapper' ref={sliderRef}>
                <WindowSell>
                    <Select
                        placeholder='Category'
                        options={fetchedDatas.categories.map(category => ({ key: category.idCategory, value: category.idCategory, text: category.categoryName }))}
                    />
                    <Select
                        placeholder='Brand'
                        options={fetchedDatas.brands.map(brand => ({ key: brand.idBrand, value: brand.idBrand, text: brand.brandName }))}
                    />
                    <Select
                        placeholder='Model'
                        options={fetchedDatas.models.map(model => ({ key: model.idModel, value: model.idModel, text: model.modelName }))}
                        onChange={(_e, { value }) => setModel((model) => ({ ...model, modelId: value }))}

                    />
                    <Button
                        color='yellow'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            marginRight: '1em',
                        }}
                        onClick={slide.bind(this, 1, 0)}
                    >
                        <Icon name='add' />
                        <span>Next</span>
                    </Button>
                </WindowSell>
                <WindowSell>
                    <Form>
                        <TextArea placeholder='Tell us more' />
                    </Form>
                    <input
                        ref={inputPhoto}
                        type='file'
                        multiple
                        style={{ display: 'none' }}
                        onChange={(x) =>
                            setModel((mod) => {
                                return { ...mod, images: x.target.files }
                            })
                        }
                    />

                    <Button
                        onClick={handleClickForm}
                        content='Add Photos'
                        style={{ margin: '0em 1em 1em 1em' }}
                    />
                    <FileDisplay files={model.images} />
                    <Button
                        color='yellow'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            marginRight: '1em',
                        }}
                        onClick={slide.bind(this, 2, 1)}
                    >
                        <Icon name='add' />
                        <span>Next</span>
                    </Button>
                </WindowSell>
                <WindowSell>
                    <Button
                        color='yellow'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            marginRight: '1em',
                        }}
                        onClick={slide.bind(this, 3, 2)}
                    >
                        <Icon name='add' />
                        <span>Next</span>
                    </Button>
                </WindowSell>
                <WindowSell>
                    <Button
                        color='yellow'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            marginRight: '1em',
                        }}
                        onClick={slide.bind(this, 3, 3)}
                    >
                        <Icon name='add' />
                        <span>Next</span>
                    </Button>
                </WindowSell>
            </div>
        </div>
    )
}

export const WindowSell = ({ children }) => {
    return (
        <div className='windowSell'>
            <div className='windowContent'>{children}</div>
        </div>
    )
}

const FileDisplay = ({ files }) => {
    const newFiles = []

    if (!files) return <></>

    for (let i = 0; i < files.length; i++) {
        newFiles.push(files[i])
    }

    console.log(newFiles)
    return (
        <div className='fileDisplay'>
            {newFiles.map((file, i) => (
                <span key={i}> {file.name}</span>
            ))}
        </div>
    )
}
