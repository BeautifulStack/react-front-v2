import { NavLink, useHistory } from 'react-router-dom'
import { Input, Icon, Button } from 'semantic-ui-react'

export const NavBar = () => {
    const history = useHistory()

    return (
        <div>
            <div className='navbar'>
                <NavLink
                    to='/'
                    style={{
                        width: '10%',
                        fontSize: '24px',
                        fontStyle: 'italic',
                        color: '#eaae00',
                    }}
                >
                    FairRepack
                </NavLink>
                <Input
                    loading
                    placeholder='Search...'
                    style={{ width: '50%', fontSize: '18px' }}
                />
                <div
                    style={{
                        width: '5%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Icon
                        style={{ cursor: 'pointer' }}
                        size='large'
                        name='circle outline'
                        onClick={() => history.push('/account')}
                    />
                    <Icon
                        style={{ cursor: 'pointer' }}
                        size='large'
                        name='shopping cart'
                        onClick={() => history.push('/cart')}
                    />
                </div>
            </div>
            <div className='shop-selector'>
                <Button
                    color='yellow'
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <Icon size='large' name='circle outline' />
                    <span>Home</span>
                </Button>
                <Button content='All Products' />
                <Button content='Associations' />
                <Button content='Shop' />
            </div>
        </div>
    )
}
