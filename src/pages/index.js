import { useRef } from 'react'
import { Button } from 'semantic-ui-react'
import background from './../images/Background.webp'
import packaging from './../images/packaging.webp'

export const Box = () => {
    return (
        <div className='Box'>
            <div>G</div>
            <span>Name</span>
        </div>
    )
}

export const Home = () => {
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
                    <Box />
                    <Box />
                    <Box />
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
                    <Box />
                    <Box />
                    <Box />
                </div>
            </div>
        </div>
    )
}
