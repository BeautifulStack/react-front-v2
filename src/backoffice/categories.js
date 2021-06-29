
import { Wrapper, ColumnWrapper, InlineWrapper } from '../utils/components/wrapper'
import { StyledContainer } from '../utils/components/containers'
import { Button, Input } from 'semantic-ui-react'
import { useState } from 'react'
import { request } from '../utils/functions/request'
import { GLOBAL } from '../utils/functions/GLOBAL'

import { useTranslation } from 'react-i18next'

export const BackofficeCategories = () => {
    const [t] = useTranslation('common')

    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState('')

    const getCategories = () => {
        request(GLOBAL.URL + '/Category/', 'GET').then((res) => {
            if (res.status === 201) {
                setCategories(res.categories)
            }
        })
    }

    useState(() => {
        getCategories()
    }, [])

    const createCategory = () => {
        request(GLOBAL.URL + '/Category/', 'POST', { categoryName }).then((res) => {
            if (res.status === 201) {
                getCategories()
                setCategoryName('')
            }
        })
    }

    return (
        <Wrapper title={t('category')}>
            <InlineWrapper>
                <StyledContainer>
                    <ColumnWrapper>
                        <h3>{t('new') + " " + t('category')}</h3>
                        <Input style={{ marginBottom: '1em' }} placeholder="Category Name" onChange={(_event, { value }) => setCategoryName(value)} value={categoryName} />
                        <Button color="yellow" onClick={createCategory} disabled={categoryName.length === 0}>Create</Button>
                    </ColumnWrapper>
                </StyledContainer>
                <ColumnWrapper>
                    {categories.map((category, i) => <CateogryLine key={i} idCategory={category.idCategory} categoryName={category.categoryName} />)}

                </ColumnWrapper>
            </InlineWrapper>
        </Wrapper>
    )
}


const CateogryLine = ({ idCategory, categoryName }) => {

    return (
        <StyledContainer>
            <div className="offer-backoffice"><span>ID: {idCategory}</span><span>Name: {categoryName}</span></div>
        </StyledContainer>)
}