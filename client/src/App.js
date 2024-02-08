import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from './components/TopBar';
import { Routes, Route } from 'react-router-dom'
import About from './components/About';
import Contact from './components/Contact';
import Policy from './components/Policy';
import NavBar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import Register from './screens/Register';
import Login from './screens/Login';
import Payment from './components/Payment';
import OrderScreen from './screens/OrderScreen';
import AdminScreen from './screens/AdminScreen';
import UserList from './components/Admin/UserList';
import OrderList from './components/Admin/OrderList';
import PizzasList from './components/Admin/PizzasList';
import AddNewPizza from './components/Admin/AddNewPizza';
import EditPizza from './components/Admin/EditPizza';

function App() {
  return (
    <div >
      <TopBar />
      <NavBar />
      <Routes>
        <Route path='/admin' element={<AdminScreen />} >
          <Route path='' element={<UserList/>}></Route>
          <Route path='userlist' element={<UserList/>}></Route>
          <Route path='orderlist' element={<OrderList/>}></Route>
          <Route path='pizzalist' element={<PizzasList/>}></Route>
          <Route path='editpizza/:pizzaId' element={<EditPizza/>}></Route>
          <Route path='addnewpizza' element={<AddNewPizza/>}></Route>
        </Route>
        <Route path='/' element={<HomeScreen />} exact></Route>
        <Route path='/about' element={<About />} exact></Route>
        <Route path='/contact' element={<Contact />} exact></Route>
        <Route path='/policy' element={<Policy />} exact></Route>
        <Route path='/cart' element={<CartScreen />} exact></Route>
        <Route path='/payment/success' element={<Payment />} exact></Route>
        <Route path='/orders' element={<OrderScreen />} exact></Route>
        <Route path='/register' element={<Register />} exact></Route>
        <Route path='/login' element={<Login />} exact></Route>
      </Routes>
    </div>
  );
}

export default App;
