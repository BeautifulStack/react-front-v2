import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Icon, Button } from 'semantic-ui-react'
import { GLOBAL } from '../utils/functions/GLOBAL'
import { request } from './../utils/functions/request'

const ProductBox = ({ id, brand, model, image, description, link }) => {
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
                <span>Buy</span>
            </Button>
        </div>
    )
}

export const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await request(
                'http://localhost/php-back2/Product/',
                'GET'
            )
            setProducts(res.products)
        }
        fetchData()
    }, [])

    return (
        <div className='productsPage'>
            <div style={{ marginBottom: '1em' }}>
                <h3>All our products</h3>
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
