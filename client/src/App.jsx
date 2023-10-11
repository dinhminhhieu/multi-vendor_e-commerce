import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Shops from './pages/Shops';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Register from './pages/Register'
import Login from './pages/Login'
import Shipping from './pages/Shipping'
import CategoryShop from './pages/CategoryShop'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { get_category } from "./store/Reducers/homeReducer";

function App() {
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(get_category());
}, [])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/shops' element={<Shops />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/product/details/:slug' element={<Details />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/shipping' element={<Shipping />}/>
      <Route path='/products?' element={<CategoryShop />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
