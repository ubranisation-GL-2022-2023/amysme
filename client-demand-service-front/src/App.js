import React, { useState, useEffect } from 'react';
import './App.css';
import socketIO  from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3002');


function App() {
  const [demandResult, setDemandResult] = useState(null);

  useEffect(() => {
    
    socket.on('data', (data) => {
      console.log(data);
      setDemandResult(data);
    });


    return () => {

    };
  }, []);

  const someDeleteRowFunction = (k) => {
    const filteredTable = demandResult.houseData.filter((d,i) => i !==k )
    setDemandResult({...demandResult, houseData:filteredTable})
  }

  return (
    
    demandResult ?  (<div class="container">
      <h2>Plan</h2>
      <center>
        <b>User:</b>   <input type="number" value={demandResult.userId} id="userId" name="userId" min="1" />
         <b>Demand:</b>  <input type="number" value={demandResult.demandId} id="demandId" name="demandId" min="1" />
         <b>Total budget: </b><input type="number" value={demandResult.totalBudget} id="totalBudget" name="totalBudget" min="1" />
      </center>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-1">No</div>
          <div class="col col-2">Part Id</div>
          <div class="col col-3">Name</div>
          <div class="col col-4">Price</div>
          <div class="col col-4">Action</div>
        </li>
        {demandResult.houseData.map((d,k) => (
        <li class="table-row">
        <div class="col col-1" data-label="No">{k}</div>
        <div class="col col-2" data-label="Part Id">{d.id }</div>
        <div class="col col-3" data-label="Name">{d.name }</div>
        <div class="col col-4" data-label="Price">{d.price }</div>
        <div class="col col-4" data-label="Delete"><button type="button" class="btn btn-danger" onClick={()=>someDeleteRowFunction(k)}>Delete</button></div>
      </li>
        ))}
      </ul>
    </div>) : (
      <div>nothing to show </div>
    )
    
    


  );
}

export default App;
