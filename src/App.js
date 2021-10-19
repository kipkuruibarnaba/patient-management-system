import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Protected from './components/Protected';
import SearchProduct from './components/SearchProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path="/">
        <Protected Cmp={Header} />
          {/* <Header /> */}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/add">
          <Protected Cmp={AddProduct} />
          {/* <AddProduct/> */}
        </Route>
        <Route path="/update/:id">
          <Protected Cmp={UpdateProduct} />
          {/* <UpdateProduct/> */}
        </Route>
        <Route path="/search">
          <Protected Cmp={SearchProduct} />
          {/* <SearchProduct/> */}
        </Route>       
        <Route path="/list">
          <Protected Cmp={ProductList} />
          {/* <ListProduct/> */}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
