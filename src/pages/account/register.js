import { useState, useEffect } from 'react/cjs/react.development'
import { Input, Button, Checkbox, Select } from 'semantic-ui-react'
import { MiddleContainer } from '../../utils/components/containers'
import {
    ColumnWrapper,
    InlineWrapper,
    Wrapper,
} from './../../utils/components/wrapper'

export const Register = () => {
    const [registerInfos, SetRegisterInfos] = useState({
        password: ''
    })

    const [isAssoc, setIsAssoc] = useState(false)


    const [assocOptions, setAssocOptions] = useState([])

    const [search, setSearch] = useState('')

    const makeRequest = () => {
        fetch("https://entreprise.data.gouv.fr/api/rna/v1/full_text/" + search).then((res) => res.json().then(j => {

            setAssocOptions(j.association.map((assoc, i) => ({ key: i, value: assoc.id, text: assoc.titre })))
        }))
    }


    useEffect(() => {
        makeRequest()
    }, [search])


    return <Wrapper title='Register'>
        <MiddleContainer>
            <ColumnWrapper>
                {/* 'firstname', 'lastname', 'email', 'phonenumber', 'password' */}
                <span style={{ marginBottom: '1em' }}>Enter your informations to interact with the website</span>
                <Input type="name" style={{ marginBottom: '1em' }} placeholder='name' />
                <Input style={{ marginBottom: '1em' }} placeholder='LastName' />
                <Input type="email" style={{ marginBottom: '1em' }} placeholder='Email' />
                <Input type="tel" style={{ marginBottom: '1em' }} placeholder='phonenumber.' />
                <Input style={{ marginBottom: '1em' }} type='password' placeholder='password.' />
                <Input style={{ marginBottom: '1em' }} type='password' placeholder='password confirmation' />
                <Checkbox style={{ marginBottom: '1em' }} toggle label='Association' onChange={(_e, value) => setIsAssoc(value.checked)} />
                {isAssoc ? <><Input style={{ marginBottom: '1em' }} type='text' placeholder='Association Name' onChange={(_event, value) => setSearch(value.value)} /><Select defaultValue={assocOptions[0] ? assocOptions[0].key : null} style={{ marginBottom: '1em' }} placeholder='Select your association' options={assocOptions} /></> : <></>}

                <Button
                    color='yellow'

                    onClick={(e) => {
                        e.stopPropagation()

                    }}
                    content="Register..."
                />

            </ColumnWrapper>
        </MiddleContainer>
    </Wrapper>
}