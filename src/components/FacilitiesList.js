import Header from "./Header";
import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';


function FacilitiesList() {
    const baseUrl = 'http://localhost/laravel-patient-api/';
    // const baseUrl ="https://laravel-student-api.herokuapp.com/";
    const [data, setData] = useState([]);
    useEffect( () => {
        getData()
    }, [
    ])
    // console.log("result", data);
    
    function findAge(dateofbirth){
        const currentdate = new Date();
        const birthdate = new Date(dateofbirth);
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const date1 = Date.UTC(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate());
        const date2 = Date.UTC(birthdate.getFullYear(), birthdate.getMonth(), birthdate.getDate());
        const age = Math.floor(((date1 - date2) / _MS_PER_DAY)/365);
        return age;
    }

    async function deleteOperation(id) {
        let result = await fetch(baseUrl +"api/delete/" + id, {
            method:"DELETE"
        });
        result = await result.json();
        console.log(result)
        getData()
    }

    async function updateOperation(id) {
        let result = await fetch(baseUrl +"api/delete/" + id, {
            method:"DELETE"
        });
        result = await result.json();
        // console.log(result)
        getData()
    }

    async function getData() {
        await fetch(baseUrl +"api/listfacilities")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div>
            <Header />
            <div className="col-md-8 offset-sm-2 mt-2">

            <div className="card">
                <div className="card-header">
                <h3>Patient List</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-sm table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Facility Name</th>
                                <th>Facility County</th>
                                <th>Facility Location</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.facilityname}</td>
                                        <td>{item.facilitycounty}</td>
                                        <td>{item.facilitylocation}</td>
                                        <td>
                                        <Link to ={"update/"+item.id }>
                                        <button className="update">Update</button>
                                        </Link>
                                        </td>       
                                        <td>
                                            <button onClick={()=>deleteOperation(item.id)} className="Delete btn btn-danger">Delete</button>
                                        </td>                                                             
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
}

export default FacilitiesList;
