import Header from './Header';
import { useState } from 'react';
import {Table} from 'react-bootstrap';

function SearchProduct() {

  const [data, setData] = useState([]);

 async function search(key){
    console.log(key)
    let result = await fetch("http://127.0.0.1/laravel-student-api/api/search/"+key);
    result = await result.json();
    console.log(result)
    setData(result);

  }
  return (
    <div>
      <Header />
      <div className="col-md-8 offset-sm-2">
        <h1>Search Product</h1>
        <input type="text" onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search Product"/>
        <br></br>
        <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Product Description</th>
                            <th>Price</th>
                            <th>Image</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) =>
                                <tr key={item.id}>
                                    <td key={item.id}>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td><img style={{ width: 60 }} src={"http://127.0.0.1/ecomm-backend/" + item.file_path}></img></td>                                                            
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
      </div>
    </div>
  )
}

export default SearchProduct;
