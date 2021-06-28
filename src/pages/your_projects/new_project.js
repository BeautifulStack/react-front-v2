import {
    ColumnWrapper,
    Wrapper,
} from '../../utils/components/wrapper'
import {MiddleContainer, StyledContainer} from '../../utils/components/containers'

import { useEffect, useState } from 'react/cjs/react.development'
import { request } from '../../utils/functions/request'
import { GLOBAL } from '../../utils/functions/GLOBAL'
import {useHistory} from 'react-router-dom'
import {Button, Input, TextArea} from "semantic-ui-react";

export const NewProject = () => {
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const [desc, setDesc] = useState("")

    const history = useHistory()

    useEffect(() => {

    }, [])

    const submitProject = () => {
        request(GLOBAL.URL + "/Project/Create", "POST", {name: name, goal: goal, desc: desc}).then(res => {
            if (res.status === 201) {
                history.push("/your_projects")
            } else console.log(res)
        })
    }

    return (
        <Wrapper title="New project">

            <MiddleContainer>
                <StyledContainer>
                    <ColumnWrapper>
                        <span style={{ marginBottom: '1em' }}>Project name :</span>
                        <Input type="text" style={{ marginBottom: '1em' }} placeholder='Name' onChange={((event, data) => setName(data.value))} />
                        <span style={{ marginBottom: '1em' }}>Project goal :</span>
                        <Input type="number" style={{ marginBottom: '1em' }} placeholder='Goal' label={{ basic: true, content: 'GreenCoin' }} labelPosition='right' onChange={(event, data) => setGoal(data.value)}/>
                        <span style={{ marginBottom: '1em' }}>Description :</span>
                        <TextArea placeholder='Describe your project' style={{ marginBottom: '1em' }} onChange={(event, data) => setDesc(data.value)} />
                        { name === "" || goal === "" || desc === "" ?
                            <Button color='yellow' onClick={submitProject} content="Create project" style={{ marginBottom: '1em' }} disabled/> :
                            <Button color='yellow' onClick={submitProject} content="Create project" style={{ marginBottom: '1em' }}/>
                        }

                    </ColumnWrapper>
                </StyledContainer>
            </MiddleContainer>

        </Wrapper>
    )
}


