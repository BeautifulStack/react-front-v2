import {
    ColumnWrapper,
    ListWrapper,
    Wrapper,
} from '../../utils/components/wrapper'
import { MiddleContainer, StyledContainer } from '../../utils/components/containers'

import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { request } from '../../utils/functions/request'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import { useHistory } from 'react-router-dom'




export const Projects = () => {
    const [project, setProject] = useState([])

    const history = useHistory()

    useEffect(() => {
        async function fetchAssoc() {
            const response = await request(GLOBAL.URL + '/Project/', 'GET');
            if (response.status === 201)
                setProject(response.projects)
        }
        fetchAssoc()
    }, [])

    return (
        <Wrapper title='Projects'>
            <ListWrapper >
                {project.map((projetSolo, i) => <ProjectBox key={i} publicKey={projetSolo.publicKey} name={projetSolo.name} description={projetSolo.description} onClick={() => history.push('/projects/' + projetSolo.idProject)} />)}

            </ListWrapper>
        </Wrapper>
    )
}


const ProjectBox = ({ publicKey, name, description, onClick }) => {
    return (
        <MiddleContainer>
            <StyledContainer onClick={onClick} pointer>
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
