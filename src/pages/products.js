import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Icon, Button } from 'semantic-ui-react'
import { GLOBAL } from '../utils/functions/GLOBAL'
import { request } from './../utils/functions/request'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

const ProductBox = ({ id, brand, model, description }) => {
    const [t] = useTranslation('common')

    const history = useHistory()

    return (
        <div
            className='productBox'
            onClick={(e) => {
                e.stopPropagation()
                history.push('/product/' + id)
            }}
        >
            <img
                width='100px'
                src='https://cnet3.cbsistatic.com/img/AljlQd2oy0rQXyooeLbR4Fog1-c=/2020/10/13/c9110b79-f2a4-422a-ac6a-4e4cb08d1fe3/34-apple-iphone-12-pro-5g-2020.png'
                alt='missing Photos :('
            />
            <span style={{ fontWeight: 'bold' }}>
                {brand} - {model}
            </span>
            <span>{description}</span>
            <Button
                color='yellow'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    request(GLOBAL.URL + '/Product/AddToCart', 'POST', { idProduct: id }).then(() => history.push('/cart'))
                }}
            >
                <Icon size='large' name='cart' />
                <span>{t('buy')}</span>
            </Button>
        </div>
    )
}

export const Products = () => {
    const [t] = useTranslation('common')

    const param = useParams()
    console.log(param)


    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchData() {
            if (!param.search) {
                const res = await request(
                    GLOBAL.URL + '/Product/',
                    'GET'
                )
                setProducts(res.products)
            } else {
                const res = await request(
                    GLOBAL.URL + '/Product/?' + param.search + "=" + param.id,
                    'GET'
                )
                setProducts(res.products)
            }

        }
        fetchData()
    }, [])

    return (
        <div className='productsPage'>
            <div style={{ marginBottom: '1em' }}>
                <h3>{t('all_products')}</h3>
            </div>
            <div className='productContainer'>
                {products.map((product, i) => (
                    <ProductBox
                        key={i}
                        id={product.idProduct}
                        brand={product.brandName}
                        model={product.modelName}
                        image='z'
                        description={`${product.originalPrice} -> ${product.resellPrice}
                        `}
                        link='Link'
                    />
                ))}

                {/* <ProductBox
                    id='2'
                    brand='Apple'
                    model='Iphone X'
                    image='z'
                    description='description'
                    link='Link'
                />
                <ProductBox
                    id='2'
                    brand='Apple'
                    model='Iphone X'
                    image='z'
                    description='description'
                    link='Link'
                />
                <ProductBox
                    id='2'
                    brand='Apple'
                    model='Iphone X'
                    image='z'
                    description='description'
                    link='Link'
                />
                <ProductBox
                    id='2'
                    brand='Apple'
                    model='Iphone X'
                    image='z'
                    description='description'
                    link='Link'
                />
                <ProductBox
                    id='2'
                    brand='Apple'
                    model='Iphone X'
                    image='z'
                    description='description'
                    link='Link'
                />
                <ProductBox
                    id='2'
                    brand='Apple'
                    model='Iphone X'
                    image='z'
                    description='description'
                    link='Link'
                /> */}
            </div>
        </div>
    )
}
