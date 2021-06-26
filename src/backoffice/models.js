
import { Wrapper, ColumnWrapper, InlineWrapper } from '../utils/components/wrapper'
import { StyledContainer } from '../utils/components/containers'
import { Button, Select, Input } from 'semantic-ui-react'
import { useState, useEffect, useRef } from 'react/cjs/react.development'
import { request } from '../utils/functions/request'
import { GLOBAL } from '../utils/functions/GLOBAL'
import { FileDisplay } from './../pages/sell/index'

export const BackofficeModels = () => {
    const [models, setModels] = useState([])
    const [clicked, setClicked] = useState(false)
    const [selectedModel, setSelectedModel] = useState(-1)

    const fetchModels = () => {
        setClicked(false)
        request(GLOBAL.URL + '/Model/All', 'GET').then((res) => {
            if (res.status === 201) {
                setModels(res.models)
            }
        })
    }

    useState(() => {
        fetchModels()
    }, [])


    console.log(models)
    return (
        <Wrapper title="Models">
            <InlineWrapper>
                <ColumnWrapper>
                    {models.map((model, i) => <ModelLine onClick={() => {
                        setSelectedModel(model.idModel)
                        setClicked(false)
                    }} key={i} categoryName={model.categoryName} modelName={model.modelName} brandName={model.brandName} />)}

                </ColumnWrapper>

                <ColumnWrapper>
                    <Button color="yellow" style={{ alignSelf: 'center' }} onClick={() => {
                        setClicked(true)
                        setSelectedModel(-1)
                    }}>New Model</Button>
                    <StyledContainer>
                        {clicked ? <NewModel onSubmit={fetchModels} /> : <></>}
                        {selectedModel !== -1 ? <span>Model Selected</span> : <></>}
                        {selectedModel === -1 && !clicked ? <span>Please select a Model</span> : <></>}
                    </StyledContainer>
                </ColumnWrapper>

            </InlineWrapper>
        </Wrapper>
    )
}

const ModelLine = ({ categoryName, modelName, brandName, onClick }) => {


    return (
        <StyledContainer onClick={onClick}>
            <div className="offer-backoffice"><span>{categoryName}</span><span>Model: {modelName}</span><span>Brand: {brandName}</span></div>
        </StyledContainer>)
}

const NewModel = ({ onSubmit }) => {

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    const [newModel, setNewModel] = useState({})

    const [loading, setLoading] = useState(false)

    const [caract, setCaract] = useState([])

    const [clicked, setClicked] = useState(false)

    const [actualCaract, setActualCaract] = useState({})

    const [files, setFiles] = useState([])

    const inputPhoto = useRef()

    const handleClickForm = () => {
        inputPhoto.current.click()
    }

    const getBrands = () => {
        request(GLOBAL.URL + '/Brand/', 'GET').then((res) => {
            if (res.status === 201) {
                setBrands(res.brands)
            }
        })
    }

    const getCategories = () => {
        request(GLOBAL.URL + '/Category/', 'GET').then((res) => {
            if (res.status === 201) {
                setCategories(res.categories)
            }
        })
    }

    const submitModel = () => {
        setLoading(true)
        request(GLOBAL.URL + '/Model/', 'POST', { ...newModel, caract: JSON.stringify(caract) }, files, "images[]").then((res) => {
            setLoading(false)
            if (res.status === 201) {
                onSubmit()
            }
        })
    }

    useEffect(() => {
        getBrands()
        getCategories()
    }, [])

    const customCategory = categories.map((category, i) => ({ key: i, value: category.idCategory, text: category.categoryName }))
    const customBrand = brands.map((brand, i) => ({ key: i, value: brand.idBrand, text: brand.brandName }))

    console.log(newModel)

    const deleteFromCaract = (title) => {
        setCaract((tmp) => {
            return tmp.filter(car => car.title !== title)
        })
    }

    return (
        <ColumnWrapper>
            <Select placeholder="Category" style={{ marginBottom: '1em' }} options={customCategory} onChange={(_event, { value }) => setNewModel((oldModel) => ({ ...oldModel, idCategory: value }))} />
            <Select placeholder="Brand" style={{ marginBottom: '1em' }} options={customBrand} onChange={(_event, { value }) => setNewModel((oldModel) => ({ ...oldModel, idBrand: value }))} />
            <Input placeholder="Model Name" style={{ marginBottom: '1em' }} onChange={(_event, { value }) => setNewModel((oldModel) => ({ ...oldModel, modelName: value }))} />
            <Input type="number" placeholder="Original Price" style={{ marginBottom: '1em' }} onChange={(_event, { value }) => setNewModel((oldModel) => ({ ...oldModel, originalPrice: value }))} />
            <Input type="number" placeholder="Resell price" style={{ marginBottom: '1em' }} onChange={(_event, { value }) => setNewModel((oldModel) => ({ ...oldModel, resellPrice: value }))} />
            <Button onClick={handleClickForm} style={{ marginBottom: '1em' }} >Add photos</Button>
            <input
                ref={inputPhoto}
                type='file'
                multiple
                style={{ display: 'none' }}
                onChange={(x) =>
                    setFiles(x.target.files)
                }
            />
            <FileDisplay files={files} />
            <Button style={{ marginBottom: '1em' }} onClick={() => setClicked(true)}>Add Caract</Button>
            {clicked ?
                <InlineWrapper>
                    <Input placeholder="Title" style={{ margin: '1em' }} onChange={(_event, { value }) => setActualCaract((oldCaract) => ({ ...oldCaract, title: value }))} />
                    <Input placeholder="Caract" style={{ margin: '1em' }} onChange={(_event, { value }) => setActualCaract((oldCaract) => ({ ...oldCaract, value }))} />
                    <Button style={{ margin: '1em' }} onClick={() => {
                        setCaract((tmp) => {
                            const second = [...tmp]
                            second.push(actualCaract)
                            return second
                        })
                        setActualCaract({})
                        setClicked(false)
                    }}>Add</Button>
                </InlineWrapper> : <></>}
            {caract.map((car, i) => <InlineWrapper><span>{car.title}</span><span>{car.value}</span><Button onClick={() => deleteFromCaract(car.title)}>Delete</Button></InlineWrapper>)}
            <Button color="yellow" onClick={submitModel} loading={loading} disabled={checkAllModel(newModel)}>Create Model</Button>
        </ColumnWrapper>)

}

const checkAllModel = (model) => {
    return !(model.resellPrice && model.originalPrice && model.modelName && model.idBrand && model.idCategory)

}