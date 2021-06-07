import { useRef, useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import background from './../images/Background.webp'
import packaging from './../images/packaging.webp'
import { request } from './../utils/functions/request'

import QRCode from 'qrcode.react'

export const Box = ({ name }) => {
    return (
        <div className='Box'>
            <div>G</div>
            <span>{name}</span>
        </div>
    )
}

export const Home = () => {
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await request(
                'http://localhost/php-back2/Brand/',
                'GET'
            )
            setBrands(res.brands)
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            const res = await request(
                'http://localhost/php-back2/Category/',
                'GET'
            )
            setCategories(res.categories)
        }
        fetchData()
    }, [])

    const sliderRed = useRef()

    const slide = (e) => {
        const position = (sliderRed.current.clientWidth / 3) * e.target.id
        sliderRed.current.scrollTo({ left: position, behavior: 'smooth' })
    }

    return (
        <div className='home'>
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
            <div style={{ display: 'flex', margin: '0 auto' }}>
                <span className='sliderClicker' onClick={slide} id='0'></span>
                <span className='sliderClicker' onClick={slide} id='1'></span>
                <span className='sliderClicker' onClick={slide} id='2'></span>
            </div>
            <div className='categoryBrowse'>
                <div
                    style={{
                        display: 'flex',
                        fontSize: '24px',
                        marginBottom: '.75em',
                    }}
                >
                    <span>Parcourir Par Category: </span>
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
                    <span>Parcourir Par Marque: </span>
                </div>
                <div className='categorySelecter'>
                    {brands.map((brand, i) => (
                        <Box key={i} name={brand.brandName} />
                    ))}
                    <QRCode value='qzdq3zd4q3z8dddddddddddddddddddqzdqzdqzdqzANTOINEQQQQQQQQQQQQQQQQQq4qz4dqzdqzudh' />
                </div>
            </div>
        </div>
    )
}
