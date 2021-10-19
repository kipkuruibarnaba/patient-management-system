import Header from "./Header";
import {withRouter} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function UpdateProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(""); 
  const [data, setData] =useState([]);

  useEffect(async()=>{
    let result = await fetch("http://127.0.0.1/laravel-student-api/api/product/"+props.match.params.id);
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
  
  let result = await fetch("http://127.0.0.1/laravel-student-api/api/update/"+id+"?_method=PUT", {
    method: "POST",
    body: formData
  });


 }

  
  return (
    <div>
      <Header />
      <div className="col-md-10 offset-sm-2">
        <h1>Update Product</h1>
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
        <img style={{width:80}} src={"http://127.0.0.1/laravel-student-api/"+data.file_path}/>
        <br></br>
        <br></br>
        <button onClick={()=>editProduct(data.id)} className="btn btn-info">Update Product</button>
      </div>
    </div>
  );
}

export default withRouter(UpdateProduct);
