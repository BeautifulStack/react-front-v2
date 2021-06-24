
import { Wrapper, ColumnWrapper, InlineWrapper } from '../utils/components/wrapper'
import { StyledContainer } from '../utils/components/containers'
import { Button } from 'semantic-ui-react'
import { useState, useEffect } from 'react/cjs/react.development'
import { request } from '../utils/functions/request'
import { GLOBAL } from '../utils/functions/GLOBAL'

export const BackofficeUser = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        request(GLOBAL.URL + '/User/', 'GET').then((res) => {
            if (res.status === 201) setUsers(res.users)
        })

    }, [])

    return (
        <Wrapper title="Users">
            <ColumnWrapper>
                {users.map((user, i) => <UserLine idUser={user.idUser} isAdmin={user.isAdmin} key={i} phonenumber={user.phonenumber} lastname={user.lastname} firstname={user.firstname} lastlog={user.lastlogin} email={user.email} />)}

            </ColumnWrapper>
        </Wrapper>
    )
}

const UserLine = ({ lastlog, isAdmin, firstname, lastname, email, phonenumber, idUser }) => {


    const typeString = getUserType(isAdmin)

    const promoteUser = (id) => {
        request(GLOBAL.URL + '/User/Promote', 'POST', { idUser: id }).then((res) => {
            if (res.status === 201) { window.location.reload(false) }
        })
    }

    const unpromoteUser = (id) => {
        request(GLOBAL.URL + '/User/Unpromote', 'POST', { idUser: id }).then((res) => {
            if (res.status === 201) { window.location.reload(false) }
        })
    }

    return (
        <StyledContainer>
            <div className="users-backoffice"><span>{firstname + " " + lastname}</span><span>{email}</span><span>{phonenumber}</span><span>Last Login: {lastlog}</span><span>{typeString}</span><span><Button content={isAdmin === "0" ? "Promote" : "Unpromote"} onClick={isAdmin === "0" ? promoteUser.bind(this, idUser) : unpromoteUser.bind(this, idUser)} /></span></div>
        </StyledContainer>)
}

const getUserType = (adminNumber) => {
    switch (adminNumber) {
        case "1": return "Est un administrateur"
        case "2": return "Est une association"
        default: return "N'est pas un administrateur"
    }
}