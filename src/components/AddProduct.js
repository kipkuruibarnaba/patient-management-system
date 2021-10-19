import Header from './Header';
import { useState } from 'react';
function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

 async function addproduct() {
    console.log(name, description, price, file)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('file', file);
   
   let result = await fetch("http://127.0.0.1/laravel-student-api/api/addproduct", {
     method: "POST",
     body: formData
   });
   alert("Data has been saved");

  }
  return (
    <div>
      <Header />
      <div className="col-md-8 offset-sm-2">
        <h1>Add Product</h1>
        <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name" className="form-control" />
        <br />
        <input type="number" onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price" className="form-control" />
        <br />
        <textarea  type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Product Description" className="form-control" />
        <br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" />
        <br />
        <button onClick={addproduct} className="btn btn-info">Add Product</button>
      </div>
    </div>
  )
}

export default AddProduct;
