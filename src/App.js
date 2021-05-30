import './App.css'
import { NavBar } from './utils/components/navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import { Home } from './pages/index'
import { Products } from './pages/products'
import { Sells, NewSell } from './pages/sell/index'

import { Cart } from './pages/cart/cart'

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/search/:search' component={Products} />
                    <Route exact path='/products' component={Products} />
                    <Route exact path='/sells' component={Sells} />
                    <Route exact path='/sells/new' component={NewSell} />
                    <Route exact path='/cart' component={Cart} />
                    <Route path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
