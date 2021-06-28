import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { ColumnWrapper, Wrapper } from "./../utils/components/wrapper"
import { GLOBAL } from "./../utils/functions/GLOBAL"
import { request } from "./../utils/functions/request"

export const Validator = () => {
    const param = useParams()
    const history = useHistory()


    if (!param.id) {
        history.push('/home')
    }

    useEffect(() => {
        request(GLOBAL.URL + '/User/Validate', 'POST', { code: param.id }).then((res) => {
            history.push('/login')
        })
    }, [])

    return <Wrapper title="Validation">
        <ColumnWrapper>
            <span>Validating Email</span>
        </ColumnWrapper>

    </Wrapper>
}