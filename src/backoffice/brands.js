
import { Wrapper, ColumnWrapper, InlineWrapper } from '../utils/components/wrapper'
import { StyledContainer } from '../utils/components/containers'
import { Button, Input } from 'semantic-ui-react'
import { useState } from 'react'
import { request } from '../utils/functions/request'
import { GLOBAL } from '../utils/functions/GLOBAL'

import { useTranslation } from 'react-i18next'

export const BackofficeBrands = () => {
    const [t] = useTranslation('common')

    const [brands, setBrands] = useState([])
    const [brandName, setBrandName] = useState('')

    const getBrands = () => {
        request(GLOBAL.URL + '/Brand/', 'GET').then((res) => {
            if (res.status === 201) {
                setBrands(res.brands)
            }
        })
    }

    useState(() => {
        getBrands()
    }, [])

    const createCategory = () => {
        request(GLOBAL.URL + '/Brand/', 'POST', { brandName, logo: "/a" }).then((res) => {
            if (res.status === 201) {
                getBrands()
                setBrandName('')
            }
        })
    }

    return (
        <Wrapper title={t('brand')}>
            <InlineWrapper>
                <StyledContainer>
                    <ColumnWrapper>
                        <h3>{t('new') + " " + t('brand')}</h3>
                        <Input style={{ marginBottom: '1em' }} placeholder="Category Name" onChange={(_event, { value }) => setBrandName(value)} value={brandName} />
                        <Button color="yellow" onClick={createCategory} disabled={brandName.length === 0}>Create</Button>
                    </ColumnWrapper>
                </StyledContainer>
                <ColumnWrapper>
                    {brands.map((brand, i) => <BrandLine key={i} idBrand={brand.idBrand} brandName={brand.brandName} />)}

                </ColumnWrapper>
            </InlineWrapper>
        </Wrapper>
    )
}


const BrandLine = ({ idBrand, brandName }) => {
    const [t] = useTranslation('common')

    return (
        <StyledContainer>
            <div className="offer-backoffice"><span>ID: {idBrand}</span><span>{t('name')}: {brandName}</span></div>
        </StyledContainer>)
}