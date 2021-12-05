import {withRouter} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from "./Header";

function UpdatePatient(props) {
  const baseUrl ="http://127.0.0.1/laravel-student-api/";
  // const baseUrl ="https://laravel-student-api.herokuapp.com/";
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(""); 
  const [data, setData] =useState([]);

  useEffect(async()=>{
    let result = await fetch(baseUrl +"api/product/"+props.match.params.id);
    result =await result.json();
    setData(result)
    setName(result.name);
    setPrice(result.price);
    setDescription(result.description);
    setFile(result.file);

  },[])
 async function editProduct (id) {
    // console.log(name, description, price, file)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('file', file);
  
  let result = await fetch(baseUrl +"api/update/"+id+"?_method=PUT", {
    method: "POST",
    body: formData
  });


 }

  
  return (
    <div>
      <Header />
      <div className="col-md-8 offset-sm-2 mt-2">
          <div className="card">
               <div className="card-header">
                  <h4>Update Product</h4>
                </div>
                  <div className="card-body">
                  <input
                  type="text"
                  onChange={(e)=>setName(e.target.value)}
                  defaultValue={data.name}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  onChange={(e)=>setDescription(e.target.value)}
                  defaultValue={data.description}
                  className="form-control"
                />
                        <br></br>
                        <br></br>
                <input
                  type="number"
                  onChange={(e)=>setPrice(e.target.value)}
                  defaultValue={data.price}
                  className="form-control"
                />
                <br></br>
                <br></br>
                <input type="file"
                onChange={(e)=>setFile(e.target.files[0])}
                defaultValue={data.file_path}
                className="form-control" />
                <br></br>
                <br></br>
                <img style={{width:80}} src={baseUrl +data.file_path}/>
                <br></br>
                <br></br>
                <button onClick={()=>editProduct(data.id)} className="btn btn-info">Update Product</button>
                  </div>
            </div>
      </div>
    </div>
  );
}

export default withRouter(UpdatePatient);
