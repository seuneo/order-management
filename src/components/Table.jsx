
function Table(props){
    return <div className="table"> 
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Order</th>
      <th scope="col">Contact</th>
    </tr>
  </thead>
  <tbody>
  {props.inputTable.map(createTableRow).reverse()}
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
    return <tr>
    <TableDataHeadRow input={props.id}/>
    <TableData input={props.input1}/>
    <TableData input={props.input2}/>
    <TableData input={props.input3}/>
  </tr>;
}

function createTableRow(inputs){
    return <TableRow key={inputs.key} id={inputs.id} input1={inputs.name} input2={inputs.order} input3={inputs.contact} />;;
}

export {Table, createTableRow};
