
import orders from "../Tableinputs"
import React, { useState } from "react";
import {Table} from "./Table";


function Form(){

  const [orderList, updateOrder] = useState([...orders]);

  const [row, setRow] = useState({
    key: orders.length+1,
    id: orders.length+1,
    name: "",
    order: "",
    contact: ""

  });

  function handleChange(event) {

    const {value, name} = event.target;
    
    setRow(prevValue => {
      if(name === "name"){
        return {
          key: prevValue.key,
          id: prevValue.id,
          name: value,
          order: prevValue.order,
          contact: prevValue.contact
        }
            
      }
  
      else if(name === "contact"){
        return {
          key: prevValue.key,
          id: prevValue.id,
          name: prevValue.name,
          order: prevValue.order,
          contact: value
        }
       
      }
  
      else if(name === "order"){
        return {
          key: prevValue.key,
          id: prevValue.id,
          name: prevValue.name,
          order: value,
          contact: prevValue.contact
        }
        
      }
    });

  }


  function clickButton(event){
      
    if((row.name !== "" && row.contact !== "") && row.order !== ""){
      
      setRow(prevValue => {
          return {
            key: prevValue.key + 1,
            id: prevValue.id + 1,
            name: prevValue.name,
            order: prevValue.order,
            contact: prevValue.contact }     
        });

        updateOrder(prevItems => {
          return [...prevItems, row];
        });

    }

    event.preventDefault(); 
    
  }

    return <div>
    <div>
     <form onSubmit={clickButton} autocomplete="off" class="orderform">
  <div class="mb-3">
    <label for="name" class="form-label">Client Name</label>
    <input onChange={handleChange} name="name" type="text" class="form-control" id="name" aria-describedby="name" />
    
  </div>
  <div class="mb-3">
    <label for="contact" class="form-label">Contact</label>
    <input onChange={handleChange} name="contact" type="text" class="form-control" id="contact" aria-describedby="contact" />
    
  </div>
  <div class="mb-3">
    <label for="order" class="form-label">Order</label>
    <input onChange={handleChange} name="order" type="text" class="form-control" id="order" aria-describedby="order"/>
    
  </div>
  <button type="submit" class="btn btn-primary">Add</button>
  </form>
  </div>

  <div>
     <Table inputTable={orderList}/>
  </div>
    
  
  </div>;
  }

  export default Form;
  