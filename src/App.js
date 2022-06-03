import React from 'react';
import './App.css';
import {Form} from './Component/Form';
import {Table} from './Component/Table';

function App() {
  const [data, setdata] = React.useState([])
  const [obj, setobj] = React.useState({})

  return (
    <>
    <h3 className='text-center my-3 text-white'>EMPLOYEE DETAILS</h3>  
    
    <div className="App">
      <Form  style={{width:"25%"}} data={data} setdata={setdata} setobj={setobj}/>
      <Table  style={{width:"10%"}} data={data} setdata={setdata} key={Date.now()}/>
    </div>
    </>
  );
}

export default App;