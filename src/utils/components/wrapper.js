export const Wrapper = ({ children, title }) => {
    return (
        <div className='page-wrapper'>
            <div style={{ marginBottom: '1em' }}>
                <h3>{title}</h3>
            </div>
            {children}
        </div>
    )
}

export const ColumnWrapper = ({ children, title }) => {
    return <div className='column-page-wrapper'>{children}</div>
}

export const InlineWrapper = ({ children, title }) => {
    return <div className='inline-page-wrapper'>{children}</div>
}
