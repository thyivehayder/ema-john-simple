import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UsingContext=createContext();


function App() {
  const [loggedInUser,setLoggedInUser]=useState({})
  return (
    <UsingContext.Provider value={[loggedInUser,setLoggedInUser]}>
    
   <Router>
    <Header></Header>
      <Switch>
        <Route path='/shop'>
          <Shop></Shop>
        </Route>
        <Route path='/review'>
          <Review></Review>
        </Route>
        <PrivateRoute path='/inventory'>
          <Inventory></Inventory>
        </PrivateRoute>
        <PrivateRoute path='/shipment'>
          <Shipment></Shipment>
        </PrivateRoute>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route exact path='/'>
          <Shop></Shop>
        </Route>
        <Route path="/product/:key">
          <ProductsDetails></ProductsDetails>
        </Route>
        <Route path='*'>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>
    </UsingContext.Provider>
  );
}

export default App;