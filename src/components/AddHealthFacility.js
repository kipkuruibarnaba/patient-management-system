import Header from './Header';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function AddHealthFacility() {
    const history = useHistory();
  const baseUrl ="http://localhost/laravel-patient-api/";
//   const baseUrl ="https://laravel-patients-api.herokuapp.com/";

    const [facility, setFacility] = useState({
        facilityName: "",
        facilityCounty: "",
        facilityLocation: ""
    });

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('facilityname', facility.facilityName);
        formData.append('facilitycounty', facility.facilityCounty);
        formData.append('facilitylocation', facility.facilityLocation);

        let result = await fetch(baseUrl +"api/addhealthfacility",  {
            method: "POST",
            body: formData
        });
        setFacility({
            facilityName: "",
            facilityLocation: "",
            facilityCounty: ""
        })
        alert("Facility Added Successfully");
        history.push('/list-facilities')
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFacility({
            ...facility,
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
              <h4>Add Health Facility</h4>
              </div>
              <div className="card-body">
                  <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                          <label>Health Facility </label>
                          <input type="text" onChange={handleChange} value={facility.facilityName} name="facilityName" placeholder="Enter Health Facility Name" className="form-control" />
                      </div>
                      <div className="form-group mb-3">
                          <label>County</label>
                          <input type="text" onChange={handleChange} value={facility.facilityCounty} name="facilityCounty" placeholder="Enter County Name" className="form-control" />
                      </div>
                      <div className="form-group mb-3">
                          <label>Location</label>
                          <input type="text" onChange={handleChange} value={facility.facilityLocation} name="facilityLocation" placeholder="Enter Location Name" className="form-control" />
                      </div>
                      <div className="form-group mb-3">
                          <button type="submit" className="btn btn-success">Add</button>
                          <button onClick={handleCancel} className="btn btn-danger ml-5">Cancel</button>
                      </div>
                  </form>
              </div>
           </div>
      </div>
    </div>
  )
}

export default AddHealthFacility;
