import React, { useState} from "react";

import Heading from "./Heading";
import Form from "./Form"
import {Login} from "./Login"

/*
import axios from 'axios';
const App = () => { const [data, setData] = useState(null);
useEffect(() => { const fetchData = async () => { 
  try { const response = await axios.get('/api/data');
  setData(response.data);
  } catch (error) { 
    console.error(error);
  }
}; 
  fetchData(); 
}, []);
 
return ( 
  <div> {data ? ( <p>{data.message}</p> ) : ( <p>Loading data...</p> )} </div>
  );
};
*/



var isLoggedIn = true;

function App() {

return (
  <div>
  {
    isLoggedIn === true ?
    <div>
  <Form/>
    </div> :
    <Login />
  }
  
  </div>
);
}

export default App;