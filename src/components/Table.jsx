
function Table(props){

  
  var pageupperbound = props.page * 10;
  var pagelowerbound = (props.page * 10) - 10;
  

    return <div className="table"> 
    <table class="table">
  <thead>
    <tr class="table">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Order</th>
      <th scope="col">Contact</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
  {props.inputTable.slice(pagelowerbound, pageupperbound).map(createTableRow)}
  </tbody>
</table>
    </div>;
}

/*
function TableHead(props){
    return <tr>
    <th scope="col">#</th>
    <th scope="col">First</th>
    <th scope="col">Last</th>
    <th scope="col">Handle</th>
  </tr>;
}

*/

function TableDataHeadRow(props){
    return <th scope="row">{props.input}</th>;
}

function TableData(props){
  
  
    return <td>{props.input}</td>;
}

function TableRow(props){

  var date;
  if(props.day == null){
    date = new Date();
  }

  else{
    date = new Date(props.day);
  }
  
  var d = "" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  

    return <tr>
    <TableData input={props.id}/>
    <TableData input={props.input1}/>
    <TableData input={props.input2}/>
    <TableData input={props.input3}/>
    <TableData input={d}/>
  </tr>;
}



function createTableRow(inputs){

  

    return <TableRow key={inputs.id} id={inputs.id} input1={inputs.name} input2={inputs.orders} input3={inputs.contact} day={inputs.day}/>;
}

export {Table, createTableRow};
