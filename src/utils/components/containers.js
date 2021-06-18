export const MiddleContainer = ({ children }) => {
    return <div className='middle-container'>{children}</div>
}

export const LeftContainer = ({ children }) => {
    return <div className='left-container'>{children}</div>
}
export const RightContainer = ({ children }) => {
    return <div className='right-container'>{children}</div>
}

export const StyledContainer = ({ children, onClick, pointer }) => {
    return <div onClick={onClick} className='styled-container' style={{ cursor: pointer ? 'pointer' : '' }} >{children}</div>
}
