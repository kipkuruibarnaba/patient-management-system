import Header from './Header';
import { useState } from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';


function SearchPatient() {
  // const baseUrl ="http://127.0.0.1/laravel-patient-api/";
  const baseUrl ="https://laravel-patients-api.herokuapp.com/";
  const [data, setData] = useState([]);

 async function search(key){
    console.log(key)
    let result = await fetch(baseUrl +"api/search/"+key);
    result = await result.json();
    console.log(result)
    setData(result);

  }
  console.log(data)
  function findAge(dateofbirth){
    const currentdate = new Date();
    const birthdate = new Date(dateofbirth);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const date1 = Date.UTC(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate());
    const date2 = Date.UTC(birthdate.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    const age = Math.floor(((date1 - date2) / _MS_PER_DAY)/365);
    return age;
}
  return (
    <div>
      <Header />
      <div className="col-md-8 offset-sm-2 mt-2">
      <div className="card">
            <div className="card-header">
            <h4>Search Patient</h4>
            </div>
            <input type="text" onChange={(e)=>search(e.target.value)} className="form-control mt-4 ml-4 col-md-6" placeholder="Enter Patient First Name "/>
            <div className="card-body">
              <table className="table table-bordered table-sm table-responsive">
                    <thead>
                        <tr>
                          <th>ID</th>
                          <th>Facility Name</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                data.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.facilityname}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{findAge(item.dateofbirth)}</td>
                                        <td>{item.gender}</td>                                                                  
                                    </tr>
                                )
                            }
                    </tbody>
                </table>
            </div>
       </div>
      </div>
    </div>
  )
}

export default SearchPatient;
