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
import { useTranslation } from 'react-i18next'

export const Sells = () => {
    const [t] = useTranslation('common')

    const history = useHistory()

    const [offer, setOffer] = useState([])
    const [clicked, setClicked] = useState(false)

    const [offerProps, setOfferProps] = useState({
        idSell: -1
    })

    const [propositions, setProposition] = useState([])

    useEffect(() => {
        request(GLOBAL.URL + '/Offer/', 'GET').then((response) => {
            if (response.status === 201)
                setOffer(response.offers)
        })
    }, [])

    const updateProposition = () => {
        setClicked(false)
        if (offerProps.idSell !== -1) {
            request(GLOBAL.URL + '/Offer/' + offerProps.idSell, 'GET').then((response) => {
                if (response.status === 201)
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
        <Wrapper title={t('your_sells')}>
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
                        <span>{t('new')}</span>
                    </Button>
                    {offer.length > 0 ?
                        offer.map((off, i) => <OfferLine
                            offerId={'#' + off.idSell}
                            status={off.status}
                            date={off.dateProposition}
                            onClick={() => setOfferProps({ idSell: off.idSell, status: off.status, date: off.dateProposition, location: off.location, address: off.addresse })}
                        />)
                        : <span>{t('no_sells')}</span>
                    }

                </ColumnWrapper>
                <StyledContainer>
                    <ColumnWrapper>
                        {offerProps.idSell !== -1 ? <>
                            <h3>{t('offer')} #{offerProps.idSell}</h3>
                            <span>{offerProps.date}</span>
                            <span>
                                Status: <b>{offerProps.status}</b>
                            </span>

                            <PDFDownloadLink document={<OfferPDF filename="facture" id={offerProps.idSell} date={offerProps.date} shippingAddress={offerProps.location + " " + offerProps.address} />} fileName="facture.pdf">

                                {({ loading }) =>
                                    loading ? t('generating') : <Button
                                        color={
                                            'yellow'
                                        }
                                        style={{ marginTop: '1em' }}
                                    >
                                        <Icon size='large' name='download' />
                                        <span>{t('delivery_sheet')}</span>
                                    </Button>
                                }
                            </PDFDownloadLink>
                            <div className='offerResumeHistory'>
                                <h5>{t('history')}: </h5>
                                <div className='scroller'>
                                    {propositions.length === 0 ? <span>{t('no_offer')}</span> :
                                        propositions.map((pro, i) => <HistoryLine
                                            status={pro.status}
                                            date={pro.date}
                                            price={pro.price + '€'}
                                            comment={pro.comment}
                                            proposedBy={pro.proposedBy}
                                        />)}

                                    {/* <CounterOffer /> */}
                                </div>
                                {propositions.length !== 0 && propositions[0].proposedBy === "0" ? <span>We are examinating your offer</span> : <InlineWrapper>
                                    {clicked ? <><Button color='yellow' onClick={acceptOffer}>Accept</Button>{' '}
                                        <Button onClick={counterOffer}>Counter Offer</Button>{' '}
                                        <Button color='red' onClick={denyOffer}>Deny</Button></> : <Button color='yellow' onClick={() => setClicked(true)}>Answer</Button>}

                                </InlineWrapper>}

                            </div>
                        </> : <span>Please Select Sell</span>}

                    </ColumnWrapper>
                </StyledContainer>
            </InlineWrapper>
        </Wrapper>
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

const HistoryLine = ({ status, date, price, comment, proposedBy }) => {
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
            <Icon name="zoom" onClick={() => alert((proposedBy !== 0 ? "Our team said: " : "You said:") + comment)} style={{ cursor: "pointer" }} />
            <span>{price}</span>
        </div>
    )
}

export const NewSell = () => {
    const [t] = useTranslation('common')

    const [model, setModel] = useState({
        idModel: -1,
        idBrand: -1,
        idCategory: -1,
        description: '',
        state: "good"
    })

    const [files, setFiles] = useState([])

    const [validate, setValidate] = useState([0, 0, 0, 0])

    const [active, setActive] = useState(0)

    const [proposed, setProposed] = useState(0)

    const [fetchedDatas, setFetchedDatas] = useState({
        categories: [],
        brands: [],
        models: []
    })

    const history = useHistory()
    const [loading, setLoading] = useState(false)

    const sliderRef = useRef()
    const inputPhoto = useRef()

    const handleClickForm = () => {
        inputPhoto.current.click()
    }


    const slide = (e, a) => {
        const position = ((sliderRef.current.scrollHeight - sliderRef.current.offsetHeight) / 2) * e
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
                if (res.status === 201)
                    setFetchedDatas((data) => ({ ...data, categories: res.categories }))
            })
            request(GLOBAL.URL + '/Brand/').then((res) => {
                if (res.status === 201)
                    setFetchedDatas((data) => ({ ...data, brands: res.brands }))
            })
            request(GLOBAL.URL + '/Model/').then((res) => {
                if (res.status === 201)
                    setFetchedDatas((data) => ({ ...data, models: res.models }))
            })

        }
        fetchData()
    }, [])


    const fetchModelPossibilities = async () => {
        if (model.idModel === -1) return
        const res = await request(GLOBAL.URL + '/Model/' + model.modelId)
        console.log(res)
    }

    const sendModel = () => {
        request(GLOBAL.URL + '/Offer/', 'POST').then((res) => {
            if (res.status === 201) {
                request(GLOBAL.URL + '/Offer/Proposition/', 'POST', { idSell: res.idSell, productState: model.state, idModel: model.idModel, comment: model.description, price: proposed }).then((res) => {
                    setLoading(false)
                    history.push('/sells')
                })
            }
        })

    }

    useEffect(() => {
        fetchModelPossibilities()
        if (model.idModel !== -1) {
            request(GLOBAL.URL + '/Model/Estimation', 'POST', { idModel: model.idModel, status: model.state }).then((res) => {
                setProposed(res.price)
            })
        }
    }, [model])


    const findedCategoryName = (fetchedDatas.categories.find((cat) => cat.idCategory === model.idCategory))

    const categoryName = findedCategoryName ? findedCategoryName.categoryName : "Not Selected"

    const findedBrandName = (fetchedDatas.brands.find((brand) => model.idBrand === brand.idBrand))
    const brandName = findedBrandName ? findedBrandName.brandName : "Not Selected"

    const findedName = (fetchedDatas.models.find((mod) => model.idModel === mod.idModel))
    const modelName = findedName ? findedName.modelName : "Not selected"

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
                                {t('choose_model')}
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
                                {t('more_details')}
                            </Step.Description>
                        </Step.Content>
                    </Step>

                    <Step
                        completed={validate[2] === 1}
                        active={active === 2}
                        onClick={slide.bind(this, 2)}
                    >
                        <Icon name='info' />
                        <Step.Content>
                            <Step.Title>{t('confirm_sell')}</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </div>
            <div className='newSellWindowWrapper' ref={sliderRef}>
                <WindowSell>
                    <Select
                        placeholder={t('category')}
                        options={fetchedDatas.categories.map(category => ({ key: category.idCategory, value: category.idCategory, text: category.categoryName }))}
                        onChange={(_e, { value }) => setModel((model) => ({ ...model, idCategory: value }))}
                    />
                    <Select
                        placeholder={t('brand')}
                        options={fetchedDatas.brands.map(brand => ({ key: brand.idBrand, value: brand.idBrand, text: brand.brandName }))}
                        onChange={(_e, { value }) => setModel((model) => ({ ...model, idBrand: value }))}
                    />
                    <Select
                        placeholder={t('models')}
                        options={fetchedDatas.models.filter(model_tmp => model_tmp.idBrand === model.idBrand && model_tmp.idCategory === model.idCategory).map(model => ({ key: model.idModel, value: model.idModel, text: model.modelName }))}
                        onChange={(_e, { value }) => setModel((model) => ({ ...model, idModel: value }))}

                    />
                    <Select
                        placeholder={t('product_state')}
                        defaultValue="good"
                        options={[{ key: 0, value: "good", text: "Good State" }, { key: 1, value: "ok", text: "State is OK" }, { key: 2, value: "bad", text: "Bad State" }]}
                        onChange={(_e, { value }) => setModel((model) => ({ ...model, state: value }))}

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
                        <span>{t('next')}</span>
                    </Button>
                </WindowSell>
                <WindowSell>
                    <Form>
                        <TextArea placeholder='Tell us more' onChange={(_event, { value }) => setModel((model) => ({ ...model, description: value }))} />
                    </Form>
                    <input
                        ref={inputPhoto}
                        type='file'
                        multiple
                        style={{ display: 'none' }}
                        onChange={(x) =>
                            setFiles(x.target.files)
                        }
                    />

                    <Button
                        onClick={handleClickForm}
                        content='Add Photos'
                        style={{ margin: '0em 1em 1em 1em' }}
                    />
                    <FileDisplay files={files} />
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
                        <span>{t('next')}</span>
                    </Button>
                </WindowSell>
                <WindowSell>
                    <ColumnWrapper>
                        <h3>{t('resume')}</h3>
                        <span>{t('category')}: <b>{categoryName}</b></span>
                        <span>{t('brand')}: <b>{brandName}</b></span>
                        <span>{t('models')}: <b>{modelName}</b></span>
                        <span>{t('proposition_price')}<b>{proposed}€</b></span>
                        <Button
                            loading={loading}

                            color='yellow'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                marginRight: '1em',
                            }}
                            onClick={() => {
                                setLoading(true)
                                sendModel()
                            }}
                        >
                            <Icon name='add' />
                            <span>{t('confirm_sell')}</span>
                        </Button>
                    </ColumnWrapper>
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

export const FileDisplay = ({ files }) => {
    const newFiles = []

    if (!files) return <></>

    for (let i = 0; i < files.length; i++) {
        newFiles.push(files[i])
    }

    return (
        <div className='fileDisplay'>
            {newFiles.map((file, i) => (
                <span key={i}> {file.name}</span>
            ))}
        </div>
    )
}
