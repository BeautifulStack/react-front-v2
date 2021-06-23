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


export const AssociationId = () => {
    const [project, setProject] = useState([])

    let { id } = useParams();

    useEffect(() => {
        async function fetchAssoc() {
            const response = await request(GLOBAL.URL + '/Project/' + id, 'GET');
            setProject(response.project)
        }
        fetchAssoc()
    }, [])

    console.log(project)

    return (
        <Wrapper title='Associations'>

            <MiddleContainer>
                <ColumnWrapper>
                    <h3>{project.name}</h3>
                    <span>{project.description}</span>
                    <span>Notre objectif est d'atteindre: <b>{project.objectif}</b> GreenCoins</span>
                    <span><b>{project.balance}</b> / <b>{project.objectif}</b> GreenCoins </span>
                    <span>Nous vous remercions par avance pour votre aide, afin de participer, scannez ce QRCode avec l'application de la maison</span>
                    <MiddleContainer>
                        {project.publicKey ? <QRCode value={project.publicKey} renderAs="svg" level="L" width="300" height="300" /> : <></>}
                    </MiddleContainer>
                </ColumnWrapper>
            </MiddleContainer>

        </Wrapper>
    )
}


