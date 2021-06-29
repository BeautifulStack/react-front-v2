import { ColumnWrapper, InlineWrapper, Wrapper } from "../../utils/components/wrapper";
import { StyledContainer } from "../../utils/components/containers";
import { request } from "../../utils/functions/request";
import { GLOBAL } from "../../utils/functions/GLOBAL";
import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const YourProjects = () => {
    const [projects, setProjects] = useState([])
    const history = useHistory()
    const [project, setProject] = useState(null)

    const updateProjects = () => {
        request(GLOBAL.URL + '/Project/User', 'GET').then(res => {
            setProject(null)
            if (res.status === 201) {
                setProjects(res.projects)
            }
        });
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
                            history.push('/new_project')
                        }}
                    >
                        <Icon name='add' />
                        <span>New</span>
                    </Button>
                    {projects.length === 0 ?
                        <span>No project</span> : projects.map(prod => <ProjectLine prod={prod} onDelete={() => {
                            request(GLOBAL.URL + '/Project/' + prod.idProject, 'DELETE').then(() => updateProjects())

                        }} showProject={() => {
                            request(GLOBAL.URL + '/Project/' + prod.idProject, 'GET').then(res => setProject(res.project))
                        }} />)}
                </ColumnWrapper>
                <ColumnWrapper>
                    {project === null ? <></> :
                        <ProjectBox project={project} withdraw={() => {
                            request(GLOBAL.URL + '/Project/' + project.idProject, 'PUT').then(() => updateProjects())
                        }} />
                    }
                </ColumnWrapper>
            </InlineWrapper>
        </Wrapper>
    )
}

export const ProjectLine = ({ prod, onDelete, showProject }) => {
    return (
        <StyledContainer>
            <InlineWrapper>
                <span>
                    Name: <b>{prod.name}</b>
                </span>
                <span>
                    Goal : <b>{prod.objectif}</b>
                </span>

                {
                    prod.active > "0" ?
                        <Button color='red' onClick={onDelete} disabled>Remove</Button> :
                        <Button color='red' onClick={onDelete}>Remove</Button>
                }

                <Button color='yellow' onClick={showProject}>Show</Button>

            </InlineWrapper>
        </StyledContainer>
    )
}

export const ProjectBox = ({ project, withdraw }) => {
    return (
        <StyledContainer style={{ cursor: 'pointer' }}>
            <h2>Project #{project.idProject}</h2>
            <ColumnWrapper>
                <span>
                    Name: <b>{project.name}</b>
                </span>
                <span>
                    Description: <b>{project.description}</b>
                </span>
                {
                    project.active > "0" ?
                        <>
                            <span> Success !</span>
                            <h2><b>{project.active / 2} EUR Claimed</b></h2>
                        </> :
                        <>
                            <span>Goal: <b>{project.balance}/{project.objectif}</b></span>
                            <progress value={project.balance} max={project.objectif} />
                        </>
                }

                <Button color='yellow' onClick={withdraw} disabled={project.balance < project.objectif || project.active > "0"}>Withdraw</Button>

            </ColumnWrapper>
        </StyledContainer>
    )
}