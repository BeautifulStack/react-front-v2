import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Input, Button } from 'semantic-ui-react'
import { MiddleContainer } from '../../utils/components/containers'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { request } from '../../utils/functions/request'
import {
    ColumnWrapper,
    Wrapper,
} from './../../utils/components/wrapper'

import { useTranslation } from 'react-i18next'

export const Update = () => {
    const [t] = useTranslation('common')

    const [pubKey, setPubKey] = useState('')
    const [oldAddress, setOldAddress] = useState('')

    const [good, setGood] = useState(false)

    const getAddress = () => {
        request(GLOBAL.URL + "/User/Address", 'GET').then((res) => {
            if (res.status === 201) {
                setOldAddress(res.address)
                setGood(true)
            }
        })
    }

    useEffect(() => {
        getAddress()
    }, [])

    const updatePukKey = () => {
        request(GLOBAL.URL + '/User/Update', 'POST', { publicKey: pubKey }).then(resp => {
            localStorage.setItem('FAIRREPACK_TOKEN', resp.token)
        })
    }
    return <Wrapper title={t('address')}>
        <MiddleContainer>
            <ColumnWrapper>
                {/* 'firstname', 'lastname', 'email', 'phonenumber', 'password' */}
                <span style={{ marginBottom: '1em' }}>{t('enter_address')}</span>
                {good ? <span>Your Address has been update</span> : <></>}
                <Input type="text" style={{ marginBottom: '1em' }} placeholder={oldAddress ? oldAddress : 'Public Key'} onChange={(e) => setPubKey(e.target.value)} />
                <Button
                    color='yellow'

                    onClick={(e) => {
                        e.stopPropagation()
                        updatePukKey()
                    }}
                    content={t('confirm')}
                />

            </ColumnWrapper>
        </MiddleContainer>
    </Wrapper>
}