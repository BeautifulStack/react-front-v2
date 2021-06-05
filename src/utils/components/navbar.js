import { useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Input, Icon, Button } from 'semantic-ui-react'

export const NavBar = () => {
    const history = useHistory()
    const location = useLocation()

    const [search, setSearch] = useState('')

    const submitSearch = () => {
        history.push('/search/' + search)
    }

    return (
        <div>
            <div className='navbar'>
                <Button className='close-cross'>X</Button>
                <NavLink to='/' className='title'>
                    FairRepack
                </NavLink>
                <Input
                    icon={<Icon name='search' link onClick={submitSearch} />}
                    placeholder='Search...'
                    className='input-navbar'
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') submitSearch()
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className='account-management'>
                    <Icon
                        style={{ cursor: 'pointer' }}
                        size='large'
                        name='send'
                        onClick={() => history.push('/sells')}
                    />
                    <Icon
                        style={{ cursor: 'pointer' }}
                        size='large'
                        name='unordered list'
                        onClick={() => history.push('/order')}
                    />
                    <Icon
                        style={{ cursor: 'pointer' }}
                        size='large'
                        name='circle outline'
                        onClick={() => history.push('/account')}
                    />

                    <Icon
                        className='notification'
                        style={{ cursor: 'pointer' }}
                        size='large'
                        name='shopping cart'
                        onClick={() => history.push('/cart')}
                    />
                </div>
            </div>
            <div className='shop-selector'>
                <NavLink to='/home'>
                    <Button
                        color={location.pathname === '/home' ? 'yellow' : ''}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Icon size='large' name='home' />
                        <span>Home</span>
                    </Button>
                </NavLink>
                <NavLink to='/products'>
                    <Button
                        color={
                            location.pathname.includes('/products') ||
                            location.pathname.includes('/search')
                                ? 'yellow'
                                : ''
                        }
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Icon size='large' name='box' />
                        <span>All Products</span>
                    </Button>
                </NavLink>
                <NavLink to='/associations'>
                    <Button
                        color={
                            location.pathname === '/associations'
                                ? 'yellow'
                                : ''
                        }
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Icon size='large' name='tree' />
                        <span>Associations</span>
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}
