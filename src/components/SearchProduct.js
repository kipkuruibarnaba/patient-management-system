import Header from './Header';
import { useState } from 'react';
import {Table} from 'react-bootstrap';

function SearchProduct() {
  // const baseUrl ="http://127.0.0.1/laravel-student-api/";
  const baseUrl ="https://laravel-student-api.herokuapp.com/";
  const [data, setData] = useState([]);

 async function search(key){
    console.log(key)
    let result = await fetch(baseUrl +"api/search/"+key);
    result = await result.json();
    console.log(result)
    setData(result);

  }
  return (
    <div>
      <Header />
      <div className="col-md-8 offset-sm-2 mt-2">
      <div className="card">
            <div className="card-header">
            <h4>Search Product</h4>
            </div>
            <input type="text" onChange={(e)=>search(e.target.value)} className="form-control mt-4 ml-4 col-md-6" placeholder="Search Product"/>
            <div className="card-body">
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
                                    <td><img style={{ width: 60 }} src={baseUrl + item.file_path}></img></td>                                                            
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
       </div>
      </div>
    </div>
  )
}

export default SearchProduct;
