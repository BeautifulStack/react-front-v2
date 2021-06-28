import { useRef, useState, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { GLOBAL } from '../utils/functions/GLOBAL'
import background from './../images/Background.webp'
import packaging from './../images/packaging.webp'
import { request } from './../utils/functions/request'
import { useTranslation } from 'react-i18next'

export const Box = ({ name }) => {
    return (
        <div className='Box'>
            <div>G</div>
            <span>{name}</span>
        </div>
    )
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height,
    }
}

export const Home = () => {
    const [t] = useTranslation('common')


    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    )

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [box, setBox] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const res = await request(
                GLOBAL.URL + '/Brand/',
                'GET'
            )
            setBrands(res.brands)
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            const res = await request(
                GLOBAL.URL + '/Category/',
                'GET'
            )
            setCategories(res.categories)
        }
        fetchData()
    }, [])

    const sliderRed = useRef()

    const slide = (e) => {
        // scrollTopMax

        const position = (sliderRed.current.scrollWidth / 3) * e
        sliderRed.current.scrollTo({ left: position, behavior: 'smooth' })
        setBox(parseInt(e))
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    console.log(box)
    return (
        <div className='home'>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <div
                    onClick={slide}
                    ref={sliderRed}
                    className='news'
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div
                        className='news-brick'
                        style={{ backgroundImage: `url(${packaging})` }}
                    >
                        <span className='news-bricks-title'>Title</span>
                        <span className='news-bricks-desc'>Desc</span>
                        <Button>
                            <span>GO</span>
                        </Button>
                    </div>
                    <div
                        className='news-brick'
                        style={{ backgroundImage: `url(${packaging})` }}
                    >
                        <span className='news-bricks-title'>Title</span>
                        <span className='news-bricks-desc'>Desc</span>
                        <Button>
                            <span>GO</span>
                        </Button>
                    </div>
                    <div
                        className='news-brick'
                        style={{ backgroundImage: `url(${packaging})` }}
                    >
                        <span className='news-bricks-title'>Title</span>
                        <span className='news-bricks-desc'>Desc</span>
                        <Button>
                            <span>GO</span>
                        </Button>
                    </div>
                </div>
                {windowDimensions.width > 1000 ? (
                    <div className='slider-control'>
                        <span
                            className='sliderClicker'
                            onClick={slide.bind(this, 0)}
                        ></span>
                        <span
                            className='sliderClicker'
                            onClick={slide.bind(this, 1)}
                        ></span>
                        <span
                            className='sliderClicker'
                            onClick={slide.bind(this, 2)}
                        ></span>
                    </div>
                ) : (
                    <div className='slider-control'>
                        <span
                            className='crosses-control'
                            onClick={slide.bind(this, box - 1)}
                            id={box}
                        >
                            <Icon size='huge' name='left arrow' />
                        </span>

                        <span
                            className='crosses-control'
                            onClick={slide.bind(this, box + 1)}
                            id={box}
                        >
                            <Icon size='huge' name='right arrow' />
                        </span>
                    </div>
                )}
            </div>
            <div className='categoryBrowse'>
                <div
                    style={{
                        display: 'flex',
                        fontSize: '24px',
                        marginBottom: '.75em',
                    }}
                >
                    <span>{t('browse_by_cat')}</span>
                </div>
                <div className='categorySelecter'>
                    {categories.map((category, i) => (
                        <Box key={i} name={category.categoryName} />
                    ))}
                </div>
            </div>
            <div className='categoryBrowse'>
                <div
                    style={{
                        display: 'flex',
                        fontSize: '24px',
                        marginBottom: '.75em',
                    }}
                >
                    <span>{t('browse_by_brand')}</span>
                </div>
                <div className='categorySelecter'>
                    {brands.map((brand, i) => (
                        <Box key={i} name={brand.brandName} />
                    ))}
                </div>
            </div>
        </div>
    )
}
