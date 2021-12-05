import Header from "./Header";
import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';


function PatientList() {
    const baseUrl = 'http://localhost/laravel-patient-api/';
    // const baseUrl ="https://laravel-patients-api.herokuapp.com/";
    const [data, setData] = useState([]);
    const [statistics, setStatistics] = useState([]);
    useEffect( () => {
        getData()
        getStatistics()
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
        await fetch(baseUrl +"api/listpatients")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getStatistics() {
        await fetch(baseUrl +"api/statistics")
            .then((response) => response.json())
            .then((data) => {
                setStatistics(data);
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
                <div className="container mb-3">
                <div className="row">
                    <div className="col-sm">
                    <div className="card">
                    <div className="card-body">
                        Total Registrations <span className="text-success h5">{statistics.totalregistrations}</span>
                    </div>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="card">
                    <div className="card-body">
                    Total Monthly Registrations <span className="text-info h5">{statistics.monthly}</span>
                    </div>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="card">
                    <div className="card-body">
                        Total Facilities <span className="text-info h5">{statistics.facilities}</span>
                    </div>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className="card">
                <div className="card-body">
                       Male <span className="text-info h5">{statistics.male}</span> <br/>
                        Female <span className="text-info h5">{statistics.female}</span>
                </div>
                </div>
                    </div>
                </div>
                </div>     
                    <table className="table table-bordered table-sm table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Facility Name</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Gender</th>
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
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{findAge(item.dateofbirth)}</td>
                                        <td>{item.gender}</td>
                                        <td>
                                        {/* <Link to ={"update/"+item.id }> */}
                                        <button className="update">Update</button>
                                        {/* </Link> */}
                                        </td>       
                                        <td>
                                        <button className="Delete btn btn-danger">Delete</button>
                                            {/* <button onClick={()=>deleteOperation(item.id)} className="Delete btn btn-danger">Delete</button> */}
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

export default PatientList;

