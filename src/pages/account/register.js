import { useHistory } from 'react-router'
import { useState, useEffect } from 'react/cjs/react.development'
import { Input, Button, Checkbox, Select } from 'semantic-ui-react'
import { MiddleContainer } from '../../utils/components/containers'
import {
    ColumnWrapper,
    Wrapper,
} from './../../utils/components/wrapper'

import { GLOBAL } from './../../utils/functions/GLOBAL'
import { request } from './../../utils/functions/request'

import { useTranslation } from 'react-i18next'

export const Register = () => {
    const [t] = useTranslation('common')

    const [registerInfos, SetRegisterInfos] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: ""
    })

    const history = useHistory()

    const [isAssoc, setIsAssoc] = useState(false)


    const [assocOptions, setAssocOptions] = useState([])

    const [search, setSearch] = useState('')

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')

    const makeRequest = () => {
        fetch("https://entreprise.data.gouv.fr/api/rna/v1/full_text/" + search).then((res) => res.json().then(j => {

            setAssocOptions(j.association.map((assoc, i) => ({ key: i, value: assoc.id, text: assoc.titre })))
        }))
    }

    const PostRegister = async () => {
        const response = await request(GLOBAL.URL + '/User/', 'POST', registerInfos)
        setLoading(false)

        if (response.status === 401) {
            setError(response.error)
        } else {
            history.push('/user/validation')
        }
    }

    useEffect(() => {
        makeRequest()
    }, [search])


    return <Wrapper title='Register'>
        <MiddleContainer>
            <ColumnWrapper>
                {error !== '' ? <span style={{ marginBottom: '1em', color: 'red' }}><b>{error}</b></span> : <></>}
                <span style={{ marginBottom: '1em' }}>{t('enter_credentials')}</span>
                <Input type="name" style={{ marginBottom: '1em' }} placeholder={t('name')} onChange={(_event, value) => SetRegisterInfos((infos) => ({ ...infos, firstname: value.value }))} />
                <Input style={{ marginBottom: '1em' }} placeholder={t('lastname')} onChange={(_event, value) => SetRegisterInfos((infos) => ({ ...infos, lastname: value.value }))} />
                <Input type="email" style={{ marginBottom: '1em' }} placeholder='Email' onChange={(_event, value) => SetRegisterInfos((infos) => ({ ...infos, email: value.value }))} />
                <Input type="tel" style={{ marginBottom: '1em' }} placeholder={t('phonenumber')} onChange={(_event, value) => SetRegisterInfos((infos) => ({ ...infos, phonenumber: value.value }))} />
                <Input style={{ marginBottom: '1em' }} type='password' placeholder={t('password')} onChange={(_event, value) => SetRegisterInfos((infos) => ({ ...infos, password: value.value }))} />
                <Input style={{ marginBottom: '1em' }} type='password' placeholder={t('password') + " confirmation"} error={registerInfos.password !== registerInfos.passwordConfirmation} onChange={(_event, value) => SetRegisterInfos((infos) => ({ ...infos, passwordConfirmation: value.value }))} />
                <Checkbox style={{ marginBottom: '1em' }} toggle label='Association' onChange={(_e, value) => setIsAssoc(value.checked)} />
                {isAssoc ? <><Input style={{ marginBottom: '1em' }} type='text' placeholder={t('assoc_name')} onChange={(_event, value) => setSearch(value.value)} /><Select onChange={(_event, value) => SetRegisterInfos((infos) => ({ ...infos, assoc_id: value.value }))} defaultValue={assocOptions[0] ? assocOptions[0].key : null} style={{ marginBottom: '1em' }} placeholder='Select your association' options={assocOptions} /></> : <></>}

                <Button
                    color='yellow'

                    onClick={(e) => {
                        e.stopPropagation()
                        setLoading(true)
                        PostRegister()
                    }}
                    loading={loading}
                    content={t('register')}
                    disabled={registerInfos.password !== registerInfos.passwordConfirmation || !registerInfos.firstname || !registerInfos.lastname || !registerInfos.email || !registerInfos.phonenumber}
                />

            </ColumnWrapper>
        </MiddleContainer>
    </Wrapper>
}