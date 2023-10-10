import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Shops from './pages/Shops';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Register from './pages/Register'
import Login from './pages/Login'
import Shipping from './pages/Shipping'

function App() {
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
    </Routes>
    </BrowserRouter>
  )
}

export default App;
