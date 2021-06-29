import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Icon, Button } from 'semantic-ui-react'
import { GLOBAL } from '../utils/functions/GLOBAL'
import { request } from '../utils/functions/request'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

const ProductBox = ({ id, brand, model, description, image, idBrand }) => {
    const [t] = useTranslation('common')

    const history = useHistory()

    const [loading, setLoading] = useState(false)

    return (
        <div
            className='productBox'
            onClick={(e) => {
                e.stopPropagation()
                history.push('/product/brand/' + idBrand)
            }}
        >
            <img
                width='100px'
                src={GLOBAL.URL + '/Images/' + image}
                alt='Missing Photos'
            />
            <span style={{ fontWeight: 'bold' }}>
                {brand} - {model}
            </span>
            <span>{description}</span>
            <Button
                loading={loading}
                disabled={loading}
                color='yellow'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    setLoading(true)
                    request(GLOBAL.URL + '/Product/AddToCart', 'POST', { idProduct: id }).then(() => {
                        setLoading(false)
                        history.push('/cart')
                    })
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
                if (res.status === 201)
                    setProducts(res.products)
            } else {
                const res = await request(
                    GLOBAL.URL + '/Product/?' + param.search + "=" + param.id,
                    'GET'
                )
                if (res.status === 201)
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
                {products.length > 0 ? <></> : <span>{t('no_products')}</span>}

                {products.map((product, i) => (
                    <ProductBox
                        idBrand={product.idBrand}
                        key={i}
                        id={product.idProduct}
                        brand={product.brandName}
                        model={product.modelName}
                        image={product.path}
                        description={`${product.originalPrice} -> ${product.resellPrice}
                        `}
                        link='Link'
                    />
                ))}

            </div>
        </div>
    )
}
