import { useHistory } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { Input, Button } from 'semantic-ui-react'
import { MiddleContainer } from '../../utils/components/containers'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { request } from '../../utils/functions/request'
import {
    ColumnWrapper,
    Wrapper,
} from './../../utils/components/wrapper'

export const Update = () => {
    const [pubKey, setPubKey] = useState('')

    const history = useHistory()

    const updatePukKey = () => {
        request(GLOBAL.URL + '/User/Update', 'POST', { publicKey: pubKey }).then(resp => {
            localStorage.setItem('FAIRREPACK_TOKEN', resp.token)
            history.push('/')
        })
    }
    return <Wrapper title='Public Key'>
        <MiddleContainer>
            <ColumnWrapper>
                {/* 'firstname', 'lastname', 'email', 'phonenumber', 'password' */}
                <span style={{ marginBottom: '1em' }}>Enter your publicKey to be able to receive your GreenCoins</span>

                <Input type="text" style={{ marginBottom: '1em' }} placeholder='Public Key' onChange={(e) => setPubKey(e.target.value)} />
                <Button
                    color='yellow'

                    onClick={(e) => {
                        e.stopPropagation()
                        updatePukKey()
                    }}
                    content="Confirm"
                />

            </ColumnWrapper>
        </MiddleContainer>
    </Wrapper>
}