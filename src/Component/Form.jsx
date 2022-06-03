import React from "react";
import axios from 'axios';

export const Form = (props) => {

  const [userdata, setuserdata]=React.useState({
    Name:'',
    Age:'',
    Address:'',
    Dept:'',
    Salary:'',
    MaritalState:false,
    Profile:'',
  })

  const inputhandle=(e)=>{

    let {name, value, checked} = e.target;
    setuserdata({
      ...userdata, 
      [name] : value,
    });
    if(name === 'MaritalState'){
      setuserdata({
        ...userdata, 
        [name] : (checked),
      });
    }

  }


  const uploaduser=()=>{
    axios.post('http://localhost:8080/posts/',{
      ...userdata
    })
    .then((response)=> {
    console.log(response);
  })
  }

  const savedata=(e)=>{
    e.preventDefault()
    props.data.push(userdata)
    props.setdata(props.data)
    props.setobj(userdata)
    uploaduser()
    }

  return (
    <div className="sidedata">
      <form className="form" onSubmit={savedata}>
        <label>Name</label>
        <input type="text" name="Name" onChange={inputhandle} />

        <label>Age</label>
        <input type="text" name="Age" onChange={inputhandle} />

        <label>Address</label>
        <input type="text" name="Address" onChange={inputhandle} />

        <label>Department</label>
        <select name="Dept" id="" className="selectdepart" onChange={inputhandle}>
          <option value="">Select Department</option>
          <option value="Manager">Manager</option>
          <option value="Officer">Officer</option>
          <option value="Junior Officer">Junior Officer</option>
          <option value="Executive Officer">Executive Officer</option>
        </select>

        <label>Salary</label>
        <input type="text" name="Salary" onChange={inputhandle} />

        <label>Marital state</label>
        <input type="checkbox" className="checkboxui"  name="MaritalState" onChange={inputhandle}/>

        <label>Profile Picture Link</label>
        <input type="text" name="Profile" onChange={inputhandle}/>

        <button className="buttton" type="submit">Save</button>
      </form>
      </div>
  );
};