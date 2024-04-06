import React, { useState, useEffect } from "react";
import {Table} from "./Table";

function Form(){

  const [orderList, updateOrder] = useState( [{data: []}]);
  const [id, updateId] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [currentPageNum, updateCurrentPageNum] = useState(1);
  const [pages, updatePages] = useState([1, 2, 3]);


  useEffect(() => {
    setLoading(true);
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        updateOrder(data);

      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);

      });
      
  }, []);

  //get id
  useEffect(() => {
    setLoading(true);
    fetch('/lastId')
      .then((res) => res.json())
      .then((data) => {
        updateId(data);

      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);

      });
      
  }, []);
   
  const day = new Date();
  const [row, setRow] = useState({
    id: id,
    name: "",
    contact: "",
    orders: "",
    day: day

  });
  

  function handleChange(event) {

    const {value, name} = event.target;
    console.log(row.id);
    setRow(prevValue => {
      if(name === "name"){
        return {
          id: prevValue.id,
          name: value,
          contact: prevValue.contact,
          orders: prevValue.orders,
          day: prevValue.day
          
        }
            
      }
  
      else if(name === "contact"){
        return {
          id: prevValue.id,
          name: prevValue.name,
          contact: value,
          orders: prevValue.orders,
          day: prevValue.day
          
        }
       
      }
  
      else if(name === "orders"){
        return {
          id: prevValue.id,
          name: prevValue.name,
          contact: prevValue.contact,
          orders: value,
          day: prevValue.day
          
        }
        
      }
    });

  }

  const clickButton = async e => {

    e.preventDefault();

    if(((row.name !== "" && row.contact !== "") && row.orders !== "") && row.id !== null ){
      
    updateId(id + 1);
     console.log(id);
     
      setRow(prevValue => {
          return {
            id: id + 1,
            name: prevValue.name,
            contact: prevValue.contact,
            orders: prevValue.orders,
            day: prevValue.day
             }     
        });

        console.log(row);
        console.log(orderList);

      try{
        const body = row;
        const response = await fetch("http://localhost:3001/add", {
          method:"POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)

        });
        
        console.log(response);
      }
      catch(err){
        console.log(err.message);
      }

      updateOrder(prevItems => {
        const data = [row, ...prevItems.data];

        return {data};
      });

      updatePages(getPages(orderList.data.length));

    }

  }

  //pagination
  function getPages(p){
    var pages = [];
    var num = p % 10;
    var j = p/10;

    if(p < 10 || p == 10){
      pages = [1];
    }
    else{
      for(let i = 1; i < j; i++){
      pages.push(i);
    }
    if(num != 0){
      pages.push(pages.length+1);

    }
    }

    return pages;
    
   
  }

  function pageClick(e){
    console.log(e);
    e.preventDefault();
    
    e.target.parentNode.parentNode.childNodes.forEach(page=> {
      page.classList.remove("active");
  });
  
    e.target.parentNode.classList.add("active");
    updateCurrentPageNum(e.target.innerText);


  
  }

  if (loading) {
    return <p>Data is loading...</p>;
  }

    return <div>

    <div class="header">
      <h1 class="heading">Orders</h1>
      <button class="btn btn-primary" id="collapseform" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="false" aria-controls="collapse">
        Add Order
      </button>
    </div>
    <div class= "collapse" id="collapse">
     <form onSubmit={clickButton} autoComplete="off" class="orderform" >
  <div class="mb-3">
    <label for="name" class="form-label">Client Name</label>
    <input onChange={handleChange} name="name" type="text" class="form-control" id="name" aria-describedby="name" />
    
  </div>
  <div class="mb-3">
    <label for="contact" class="form-label">Contact</label>
    <input onChange={handleChange} name="contact" type="text" class="form-control" id="contact" aria-describedby="contact" />
    
  </div>
  <div class="mb-3">
    <label for="orders" class="form-label">Order</label>
    <input onChange={handleChange} name="orders" type="text" class="form-control" id="orders" aria-describedby="orders"/>
    
  </div>
  <button type="submit" class="btn btn-primary">Add</button>
  </form>
  </div>

  <div class="ordertablesection">
  {orderList !== null ? ( <Table inputTable={orderList.data || []} page={currentPageNum}/> ) : ( <p>Loading data...</p> )}
  
  </div>
  <div class="paginate">
  <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link">&lt;</a>
    </li> 
    {(pages).map(function(data) {
      return (
        <li class="page-item" onClick={pageClick}><a  class="page-link" href="#">{data}</a></li>
      )
    })}
    <li class="page-item">
      <a class="page-link" href="#">&gt;</a>
    </li>
  </ul>
</nav>
  </div>
    
  
  </div>;
  }

  export default Form;
