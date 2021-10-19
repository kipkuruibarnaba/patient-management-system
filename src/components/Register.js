
import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';


function Register() {

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/add") 
        }
    },[])
    const [name, SetName] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const history = useHistory();

     async function SignUp() {
        let item = { name, email, password }
        console.log(item)
         let result = await fetch("http://127.0.0.1/laravel-student-api/api/register", {
            method: 'POST',
            body  : JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept" :"application/json"
            }
        })
         result = await result.json()
        //  console.log("result", result)
         localStorage.setItem('user-info', JSON.stringify(result))
         history.push("/add")
    }

    return (
        <div>
            <Header />
            <div className="col-md-10 offset-sm-2">
            <h1>Register</h1>
            <input type="text" value={name} onChange={(e)=>SetName(e.target.value)} className="form-control" placeholder="Enter Name" />
            <br/>
            <input type="email" value={email} onChange={(e)=>SetEmail(e.target.value)} className="form-control" placeholder="Enter Email" />
            <br/>
            <input type="password" value={password} onChange={(e)=>SetPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
            <br/>
            <button onClick={SignUp} className="btn btn-primary">Register</button>
            </div>
        </div>
)
}

export default Register;