import {
    ColumnWrapper,
    ListWrapper,
    Wrapper,
} from '../../utils/components/wrapper'
import { MiddleContainer, StyledContainer } from './../../utils/components/containers'

import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react/cjs/react.development'
import { request } from '../../utils/functions/request'
import { GLOBAL } from '../../utils/functions/GLOBAL'




export const Association = () => {
    const [project, setProject] = useState([])

    useEffect(() => {
        async function fetchAssoc() {
            const response = await request(GLOBAL.URL + '/Project/', 'GET');
            setProject(response.projects)
        }
        fetchAssoc()
    }, [])

    return (
        <Wrapper title='Associations'>
            <ListWrapper >
                {project.map((projetSolo, i) => <AssociationBox key={i} publicKey={projetSolo.publicKey} name={projetSolo.name} description={projetSolo.description} />)}

            </ListWrapper>
        </Wrapper>
    )
}


const AssociationBox = ({ publicKey, name, description }) => {
    return (
        <MiddleContainer>
            <StyledContainer>
                <ColumnWrapper>
                    <h2>{name}</h2>
                    <MiddleContainer>
                        <QRCode value={publicKey} />
                    </MiddleContainer>
                    <span style={{ paddingTop: '1em' }}>{description}</span>
                </ColumnWrapper>
            </StyledContainer>
        </MiddleContainer>
    )

}