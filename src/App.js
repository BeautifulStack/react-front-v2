import './App.css'
import { NavBar } from './utils/components/navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import { Home } from './pages/index'
import { Products } from './pages/products'
import { Sells, NewSell } from './pages/sell/index'

import { Cart } from './pages/cart/cart'
import { Order } from './pages/orders/order'
import { Projects } from './pages/projects/index'
import { ProjectId } from './pages/projects/project'

import { Register } from './pages/account/register'
import { Login } from './pages/account/login'
import { Update } from './pages/account/update'

import { BackofficeUser } from './backoffice/index'
import { BackofficeOffers } from './backoffice/offers'
import { BackofficeCategories } from './backoffice/categories'
import { BackofficeBrands } from './backoffice/brands'
import { BackofficeModels } from './backoffice/models'
import { YourProjects } from "./pages/your_projects";
import { NewProject } from "./pages/your_projects/new_project";
import { Validator } from './pages/validator'

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/projects' component={Projects} />
                    <Route exact path='/projects/:id' component={ProjectId} />

                    <Route exact path='/validate/:id' component={Validator} />
                    <Route exact path='/products/:search/:id' component={Products} />
                    <Route exact path='/products' component={Products} />
                    <Route exact path='/sells' component={Sells} />
                    <Route exact path='/sells/new' component={NewSell} />
                    <Route exact path='/order' component={Order} />
                    <Route exact path='/cart' component={Cart} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/account' component={Update} />

                    <Route exact path='/backoffice/categories' component={BackofficeCategories} />
                    <Route exact path='/backoffice/brands' component={BackofficeBrands} />
                    <Route exact path='/backoffice/models' component={BackofficeModels} />

                    <Route exact path='/backoffice/users' component={BackofficeUser} />
                    <Route exact path='/backoffice/offers' component={BackofficeOffers} />

                    <Route exact path='/your_projects' component={YourProjects} />
                    <Route exact path='/new_project' component={NewProject} />

                    <Route path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
