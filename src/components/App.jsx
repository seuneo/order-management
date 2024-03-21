import React, {useState} from "react";

import Heading from "./Heading";
import Form from "./Form"
import Login from "./Login"

var isLoggedIn = true;


function App() {

return (
  <div>
  {
    isLoggedIn === true ?
    <div>
    <Heading/>
  <Form/>
    </div> :
    <Login />
  }
  
  </div>
);
}

export default App;