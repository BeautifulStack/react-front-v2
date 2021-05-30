import { useRef, useState } from 'react'
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
import { ColumnWrapper, InlineWrapper } from './../../utils/components/wrapper'

export const Sells = () => {
    const history = useHistory()

    return (
        <div className='sellsPage'>
            <div className='sellsPageSells'>
                <h3>Your Sells</h3>
                <Button
                    color='yellow'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        history.push('/sells/new')
                    }}
                >
                    <Icon name='add' />
                    <span>New</span>
                </Button>
                <OfferLine
                    offerId='#1861'
                    status='accepted'
                    date='24/05/2015: 16h30'
                    price='200€'
                />
                <OfferLine
                    offerId='#1861'
                    status='accepted'
                    date='24/05/2015: 16h30'
                    price='200€'
                />
                <OfferLine
                    offerId='#1861'
                    status='accepted'
                    date='24/05/2015: 16h30'
                    price='200€'
                />
                <OfferLine
                    offerId='#1861'
                    status='accepted'
                    date='24/05/2015: 16h30'
                    price='200€'
                />
                {/* <span>No sell for the moment</span> */}
            </div>
            <div className='offerResume'>
                <h3>Offer #1354</h3>
                <span>24/05/2015: 16h30</span>
                <span>
                    <b>Status: </b>Accepted
                </span>
                <div className='offerResumeHistory'>
                    <h5>History: </h5>
                    <div className='scroller'>
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <HistoryLine
                            status='accepted'
                            date='24/05/2015: 16h30'
                            price='200€'
                        />
                        <CounterOffer />
                    </div>

                    <InlineWrapper>
                        <Button color='yellow'>Accept</Button>{' '}
                        <Button>Counter Offer</Button>{' '}
                        <Button color='red'>Deny</Button>
                    </InlineWrapper>
                </div>
            </div>
        </div>
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

const OfferLine = ({ offerId, status, date, price }) => {
    return (
        <div
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

const HistoryLine = ({ status, date, price }) => {
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
            <span>{status}</span>
            <span>{date}</span>
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

    console.log(model)

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
                            <Step.Title>Details</Step.Title>
                            <Step.Description>
                                Enter product Details
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
                        options={[{ key: '1', value: '1', text: 'Category 1' }]}
                    />
                    <Select
                        placeholder='Brand'
                        options={[{ key: '1', value: '1', text: 'Category 1' }]}
                    />
                    <Select
                        placeholder='Model'
                        options={[{ key: '1', value: '1', text: 'Category 1' }]}
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
