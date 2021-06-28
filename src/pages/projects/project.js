import {
    ColumnWrapper,
    Wrapper,
} from '../../utils/components/wrapper'
import { MiddleContainer } from '../../utils/components/containers'

import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react/cjs/react.development'
import { request } from '../../utils/functions/request'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

export const ProjectId = () => {
    const [project, setProject] = useState([])

    let { id } = useParams();

    useEffect(() => {
        async function fetchAssoc() {
            const response = await request(GLOBAL.URL + '/Project/' + id, 'GET');
            setProject(response.project)
        }
        fetchAssoc()
    }, [])

    return (
        <Wrapper title={project.name}>

            <MiddleContainer>
                <ColumnWrapper>
                    <h3>{project.name}</h3>
                    <span>{project.description}</span>
                    <span>{t('goal')}: <b>{project.objectif}</b> GreenCoins</span>
                    <span><b>{project.balance}</b> / <b>{project.objectif}</b> GreenCoins </span>
                    <span>{t('thanks')}</span>
                    <MiddleContainer>
                        {project.publicKey ? <QRCode value={project.publicKey} renderAs="svg" level="L" width="300" height="300" /> : <></>}
                    </MiddleContainer>
                </ColumnWrapper>
            </MiddleContainer>

        </Wrapper>
    )
}
