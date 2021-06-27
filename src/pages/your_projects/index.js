import {ColumnWrapper, InlineWrapper, Wrapper} from "../../utils/components/wrapper";
import {StyledContainer} from "../../utils/components/containers";
import {request} from "../../utils/functions/request";
import {GLOBAL} from "../../utils/functions/GLOBAL";
import {useEffect, useState} from "react";
import {Button, Icon} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

export const YourProjects = () => {
    const [projects, setProjects] = useState([])
    const history = useHistory()
    const [project, setProject] = useState(null)

    const updateProjects = () => {
        request(GLOBAL.URL + '/Project/', 'GET').then(res => setProjects(res.projects));
    }

    useEffect(() => {
        updateProjects()
    }, [])

    return (
        <Wrapper title='Your projects'>
            <InlineWrapper>
                <ColumnWrapper>
                    <Button
                        color='yellow'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            history.push('/')
                        }}
                    >
                        <Icon name='add' />
                        <span>New</span>
                    </Button>
                    {projects.length === 0 ?
                        <span>No project</span> : projects.map(prod => <ProjectLine deletable name={prod.name} goal={prod.objectif} onClick={() => {
                        request(GLOBAL.URL + '/Project/Remove', 'POST', { idProject: prod.idProject }).then(() => updateProjects())

                    }} onClick2={() => {
                            request(GLOBAL.URL + '/Project/' + prod.idProduct, 'GET').then(res => setProject(res))
                        }} />)}
                </ColumnWrapper>
                <ColumnWrapper>
                    {project === null ? <></> :
                        <ProjectBox project={project}/>
                    }
                </ColumnWrapper>
            </InlineWrapper>
        </Wrapper>
    )
}

export const ProjectLine = ({ name, goal, onClick, deletable, onClick2 }) => {
    return (
        <StyledContainer onClick={ onClick2 }>
            <InlineWrapper>
                <span>
                    Name: <b>{name}</b>
                </span>
                <span>
                    Goal : <b>{goal}</b>
                </span>

                {deletable ? <span style={{ color: 'red', cursor: 'pointer' }} onClick={onClick}>
                    <b>Remove</b>
                </span> : <></>}

            </InlineWrapper>
        </StyledContainer>
    )
}


export const ProjectBox = ({project}) => {
    // TODO get project
    return(
        <StyledContainer>
            <h2>Project #{project.idProject}</h2>
        </StyledContainer>
    )
}