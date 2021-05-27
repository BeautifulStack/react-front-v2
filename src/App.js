import './App.css'
import { NavBar } from './utils/components/navbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Home } from './pages/index'

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path='/home' component={Home} />
                    <Route path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
