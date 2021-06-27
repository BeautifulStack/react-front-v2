import { useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Input, Icon, Button, Dropdown } from 'semantic-ui-react'

export const NavBar = () => {
    const languages = [
        {
            key: 'french',
            text: 'Français',
            value: 'french',
            flag: 'fr',
        },
        {
            key: 'english',
            text: 'English',
            value: 'English',
            flag: 'us',
        },
    ]

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
                    {localStorage.getItem('FAIRREPACK_TOKEN') === null ?
                        <>
                            <Button
                                onClick={() => history.push('/login')}
                                color={
                                    location.pathname.includes('/login')
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='sign-out' />
                                <span>Login</span>
                            </Button>
                            <Button
                                onClick={() => history.push('/register')}
                                color={
                                    location.pathname.includes('/register')
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='sign-out' />
                                <span>Register</span>
                            </Button></> : <><Icon
                                style={{ cursor: 'pointer' }}
                                size='large'
                                name='external share'
                                onClick={() => {
                                    localStorage.removeItem('FAIRREPACK_TOKEN')
                                    history.push('/login')
                                }}
                            />

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
                            /></>}

                    <Dropdown
                        style={{ minWidth: '150px' }}
                        button
                        defaultValue={'french'}
                        className='icon'
                        floating
                        labeled
                        icon='world'
                        options={languages}
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
                <NavLink to='/projects'>
                    <Button
                        color={
                            location.pathname === '/projects'
                                ? 'yellow'
                                : ''
                        }
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Icon size='large' name='tree' />
                        <span>Projects</span>
                    </Button>
                </NavLink>
                {localStorage.getItem('FAIRREPACK_ADMIN') === "1" ?
                    <>
                        <NavLink to='/backoffice/categories'>
                            <Button
                                color={
                                    location.pathname === '/backoffice/categories'
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='certificate' />
                                <span>Category</span>
                            </Button>
                        </NavLink>
                        <NavLink to='/backoffice/brands'>
                            <Button
                                color={
                                    location.pathname === '/backoffice/brands'
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='building' />
                                <span>Brands</span>
                            </Button>
                        </NavLink>
                        <NavLink to='/backoffice/models'>
                            <Button
                                color={
                                    location.pathname === '/backoffice/models'
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='phone' />
                                <span>Models</span>
                            </Button>
                        </NavLink>
                        <NavLink to='/backoffice/users'>
                            <Button
                                color={
                                    location.pathname === '/backoffice/users'
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='user' />
                                <span>Users</span>
                            </Button>
                        </NavLink>
                        <NavLink to='/backoffice/offers'>
                            <Button
                                color={
                                    location.pathname === '/backoffice/offers'
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='zip' />
                                <span>Offers</span>
                            </Button>
                        </NavLink></>
                    : <></>}
                {localStorage.getItem('FAIRREPACK_ADMIN') === "2" ?
                    <NavLink to='/you/association/projects'>
                            <Button
                                color={
                                    location.pathname === '/you/association/projects'
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='user' />
                                <span>Your projects</span>
                            </Button>
                        </NavLink>
                    : <></>}
            </div>
        </div>
    )
}
