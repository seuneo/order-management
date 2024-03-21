import {Table} from "./Table";
import orders from "../Tableinputs";

function Orders(){
    return <div>
    <h1>All Orders</h1>
    <Table inputTable={orders}/>
  </div>;
}

export default Orders;