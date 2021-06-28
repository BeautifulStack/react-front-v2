import { useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Input, Icon, Button, Dropdown } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

export const NavBar = () => {
    const [t, i18n] = useTranslation('common')


    const languages = [
        {
            key: 'french',
            text: 'Français',
            value: 'fr',
            flag: 'fr',
        },
        {
            key: 'english',
            text: 'English',
            value: 'en',
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
                                <span>{t('login')}</span>
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
                                <span>{t('register')}</span>
                            </Button></> : <><Icon
                                style={{ cursor: 'pointer' }}
                                size='large'
                                name='external share'
                                onClick={() => {
                                    localStorage.removeItem('FAIRREPACK_TOKEN')
                                    localStorage.removeItem('FAIRREPACK_ADMIN')
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
                        defaultValue={'fr'}
                        className='icon'
                        floating
                        labeled
                        icon='world'
                        options={languages}
                        onChange={(_e, { value }) => i18n.changeLanguage(value)}
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
                        <span>{t('home')}</span>
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
                        <span>{t('all_products')}</span>
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
                        <span>{t('association')}</span>
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
                                <span>{t('category')}</span>
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
                                <span>{t('brand')}</span>
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
                                <span>{t('models')}</span>
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
                                <span>{t('users')}</span>
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
                                <span>{t('offers')}</span>
                            </Button>
                        </NavLink></>
                    : <></>}
                {localStorage.getItem('FAIRREPACK_ADMIN') === "2" ?
                    <><NavLink to='/you/association'>
                        <Button
                            color={
                                location.pathname === '/you/association'
                                    ? 'yellow'
                                    : ''
                            }
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <Icon size='large' name='user' />
                            <span>{t('your_assoc')}</span>
                        </Button>
                    </NavLink>
                        <NavLink to='/you/association/projects'>
                            <Button
                                color={
                                    location.pathname === '/you/association/projects'
                                        ? 'yellow'
                                        : ''
                                }
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Icon size='large' name='paw' />
                                <span>{t('your_project')}</span>
                            </Button>
                        </NavLink></>
                    : <></>}
            </div>
        </div>
    )
}
