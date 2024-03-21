function Login(){
    return <form action="/add" method="post">
    <h1>Welcome to order scheduler</h1>
    <div>
      <input type="text" name="name" placeholder="username" />
    </div>
    <div>
        <input type="password" name="password" placeholder="password" />
    </div>
    <button type="submit">Log In</button>
  </form>;
  }

  export default Login;