import Header from './Header';
import { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
function AddPatient() {
    const history = useHistory();
//   const baseUrl ="http://127.0.0.1/laravel-patient-api/";
  const baseUrl ="https://laravel-patients-api.herokuapp.com/";

    const [patient, setPatient] = useState({
        facilityName: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateofbirth: ""
    });
    const [facility, setFacility] = useState([]);
    useEffect( () => {
        getFacilities()
    }, [
    ])
    async function getFacilities() {
        await fetch(baseUrl +"api/listfacilities")
            .then((response) => response.json())
            .then((data) => {
                setFacility(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    console.log(facility)
 async function handleSubmit(event) {
    event.preventDefault();
     const formData = new FormData();
     formData.append('facilityname', patient.facilityName);
     formData.append('firstname', patient.firstName);
     formData.append('lastname', patient.lastName);
     formData.append('gender', patient.gender);
     formData.append('dateofbirth', patient.dateofbirth);
   
   let result = await fetch(baseUrl +"api/addpatient", {
     method: "POST",
     body: formData
   });
   result = await result.json();
   result = JSON.stringify(result)
//    alert(result);
   alert("Patient has been added successfully");
   history.push('/list-patients')
  }

    function handleChange(event) {
        const { name, value } = event.target;
        setPatient({
            ...patient,
            [name]: value
        });
    }
    function handleCancel() {
        history.push('/')
    }
  return (
    <div>
      <Header />
      <div className="col-md-8 offset-sm-2 mt-2">

      <div className="card">
              <div className="card-header">
              <h4>Add Patient</h4>
              </div>
              <div className="card-body">
                  <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                          <label>Health Facility </label>
                          <select className="form-control" onChange={handleChange} name="facilityName">
                              <option>Select Health Facility</option>
                              {
                               facility.map((itemoption)=>
                               <option value={itemoption.facilityname} key={itemoption.id}>{itemoption.facilityname}</option>
    
                               ) 
                              }
                          </select>
                      </div>
                      <div className="form-group mb-3">
                          <label>Patient First Name</label>
                          <input type="text" onChange={handleChange} value={patient.firstName} name="firstName" placeholder="Enter Patient First Name" className="form-control" />
                      </div>
                      <div className="form-group mb-3">
                          <label>Patient Last Name</label>
                          <input type="text" onChange={handleChange} value={patient.lastName} name="lastName" placeholder="Enter Patient Last Name" className="form-control" />
                      </div>
                      <div className="form-group mb-3">
                          <label>Gender</label>
                          <select className="form-control" name="gender" value={patient.gender} onChange={handleChange}>
                              <option></option>
                              <option>Male</option>
                              <option>Female</option>
                          </select>
                      </div>
                      <div className="form-group mb-3">
                          <label>Date of Birth</label>
                          <input type="date" name="dateofbirth" onChange={handleChange} value={patient.dateofbirth}  className="form-control" />
                      </div>
                      <div className="form-group mb-3">
                          <button type="submit" className="btn btn-success">Add Patient</button>
                          <button onClick={handleCancel} className="btn btn-danger ml-5">Cancel</button>
                      </div>
                  </form>
              </div>
           </div>
      </div>
    </div>
  )
}

export default AddPatient;



             //    <option value={`${itemoption.id}||${itemoption.facilityname}`} key={itemoption.id}>{itemoption.facilityname}</option>