import './App.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProduct from './components/UpdatePatient';
import AddHealthFacility from './components/AddHealthFacility';
import AddPatient from './components/AddPatient';
import PatientList from './components/PatientList';
import FacilitiesList from './components/FacilitiesList';
import Protected from './components/Protected';
import SearchPatient from './components/SearchPatient';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path="/">
        <Protected Cmp={Header} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/add-facility">
          <Protected Cmp={AddHealthFacility} />
        </Route>
          <Route path="/add-patient">
            <Protected Cmp={AddPatient} />
          </Route>
        <Route path="/update/:id">
          <Protected Cmp={UpdateProduct} />
        </Route>
        <Route path="/search">
          <Protected Cmp={SearchPatient} />
        </Route> 
        <Route path="/list-patients">
          <Protected Cmp={PatientList} />
          </Route>      
        <Route path="/list-facilities">
          <Protected Cmp={FacilitiesList} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
