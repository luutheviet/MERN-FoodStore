import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Checkout from './cart/Checkout';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import Detail from './detailProduct/Detail';
// import DetailProduct from './detailProduct/DetailProduct';
import DetailHistory from './history/DetailHistory';
import OderHistory from './history/OderHistory';
import Products from './products/Products';
import NotFound from './utils/not_found/NotFound';

function MainPage() {
    const state=useContext(GlobalState)
    const [isLogged]=state.userAPI.isLogged
    const [isAdmin]=state.userAPI.isAdmin
    return (
            <Switch>
                <Route path="/detail/:id" exact component={Detail}/>
                <Route path='/cart' exact component={Cart}/>
                <Route path='/login' exact component={isLogged?NotFound:Login}/>
                <Route path='/register' exact component={isLogged?NotFound:Register}/>
                <Route path='/checkout' exact component={isLogged?Checkout:NotFound}/>
                <Route path='/history' exact component={isLogged?OderHistory:NotFound}/>
                <Route path='/history/:id' exact component={isLogged?DetailHistory:NotFound}/>
                <Route path='/create_product' exact component={isAdmin?CreateProduct:NotFound}/>
                <Route path='/edit_product/:id' exact component={isAdmin?CreateProduct:NotFound}/>
                <Route path='/category' exact component={isAdmin?Categories:NotFound}/>
                <Route path='/' exact component={Products}/>
                <Route path='*' exact component={NotFound}/>
            </Switch>
    );
}

export default MainPage;