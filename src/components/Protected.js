import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function Protected(props) {
  let Product = props.Cmp;
  const history = useHistory();
  useEffect(() => {
    if (! localStorage.getItem("user-info")) {
      history.push("/register");
    }
  }, []);
  return (
    <div>
      <Product />
    </div>
  );
}

export default Protected;
