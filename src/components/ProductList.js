import Header from "./Header";
import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function ProductList() {
    // const baseUrl = 'http://127.0.0.1/laravel-student-api/';
    const baseUrl ="https://react-ecomm-front.herokuapp.com/";
    const [data, setData] = useState([]);
    useEffect( () => {
        // let result = await fetch("http://127.0.0.1/ecomm-backend/api/listproducts");
        //  result = await result.json();
        // setData(result);
        getData()
    }, [
    ])
    console.log("result", data);

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
        console.log(result)
        getData()
    }

   async function getData() {
        let result = await fetch(baseUrl +"api/listproducts");
        result = await result.json();
        setData(result);
    }
    return (
        <div>
            <Header />
            <div className="col-md-8 offset-sm-2 mt-2">

            <div className="card">
                <div className="card-header">
                <h3>Product List</h3>
                </div>
                <div className="card-body">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Product Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td><img style={{ width: 60 }} src={baseUrl  + item.file_path}></img></td>
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
                    </Table>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ProductList;
