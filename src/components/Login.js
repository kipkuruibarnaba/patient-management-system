import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function Login() {
    // const baseUrl ="http://127.0.0.1/laravel-patient-api/";
    const baseUrl ="https://laravel-patients-api.herokuapp.com/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            history.push("/add-facility");
        }
    }, []);
  
    async function login() {
        let item = { email, password }
        console.log(item)
        let result = await fetch(baseUrl +"api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json()
        //  console.log("result", result)
        localStorage.setItem('user-info', JSON.stringify(result))
        history.push("/list-patients")
    }
    return (
        <div>
            <Header />
            <div className="col-md-6 offset-sm-2 mt-2">
                <div className="card">
                    <div className="card-header">
                    <h4>Login</h4>
                    </div>
                    <div className="card-body">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter Email"
                        />
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter Password"
                        />
                        <br />
                        <button onClick={login} className="btn btn-success">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
