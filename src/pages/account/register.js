import { useState } from 'react/cjs/react.development'
import { Input, Button } from 'semantic-ui-react'
import { MiddleContainer } from '../../utils/components/containers'
import {
    ColumnWrapper,
    Wrapper,
} from './../../utils/components/wrapper'

export const Register = () => {
    const [registerInfos, SetRegisterInfos] = useState({
        password: ''
    })
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