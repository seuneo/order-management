import React, { useState } from "react";

function Login(){
    return <div>
  <h1>Welcome</h1>
  <form autocomplete="off">
  <div class="mb-3">
    <label for="name" class="form-label">Username</label>
    <input name="name" type="text" class="form-control" id="name" aria-describedby="name" />  
  </div>
  <div class="mb-3">
    <label for="order" class="form-label">Password</label>
    <input name="password" type="password" class="form-control" id="password" aria-describedby="password"/>    
  </div>
  <button  type="submit" class="btn btn-primary">Log In</button>
  </form>
  </div>;
  }

  export {Login};