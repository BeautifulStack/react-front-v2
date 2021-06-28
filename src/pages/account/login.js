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

import { useTranslation } from 'react-i18next'

export const Login = () => {
    const [t] = useTranslation('common')


    const [login, setLogin] = useState({
        password: '',
        email: ''
    })

    const history = useHistory()

    if (localStorage.getItem('FAIRREPACK_TOKEN')) history.push('/')

    const loginRequest = () => {
        request(GLOBAL.URL + '/Login/', 'POST', login).then(res => {
            if (res.token) {
                localStorage.setItem('FAIRREPACK_TOKEN', res.token)
                localStorage.setItem('FAIRREPACK_ADMIN', res.admin)
                window.location.reload(false)
            }
        })
    }

    return <Wrapper title={t('login')}>
        <MiddleContainer>
            <ColumnWrapper>
                {/* 'firstname', 'lastname', 'email', 'phonenumber', 'password' */}
                <span style={{ marginBottom: '1em' }}>{t('enter_credentials')}</span>

                <Input type="email" style={{ marginBottom: '1em' }} placeholder='Email' onChange={(e) => setLogin((log) => ({ ...log, email: e.target.value }))} />
                <Input style={{ marginBottom: '1em' }} type='password' placeholder={t('password')} onChange={(e) => setLogin((log) => ({ ...log, password: e.target.value }))} />
                <Button
                    color='yellow'

                    onClick={(e) => {
                        e.stopPropagation()
                        loginRequest()
                    }}
                    content="Login..."
                />

            </ColumnWrapper>
        </MiddleContainer>
    </Wrapper>
}