import React, { useState } from "react";
import axios from "axios";
import { Pagination } from "./Pagination";

export const Table = (props) => {

  const [userdata, setuserdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [page, setpage] = useState(1);
  const [sort, setsort] = useState("");
  const [reload, setreload] = useState("");
  const [filter, setfilter] = useState("");
  const [limit, setlimit] = useState(1)

  const getdata = () => {
    axios
      .get(`http://localhost:8080/posts?_page=${page}&_limit=5`)
      .then((response) => {
        console.log(response);
        setuserdata(response.data);
        setfilterdata(response.data);
        setlimit(response.data)
      });
  };
  React.useEffect(() => {
    getdata();
  }, [page]);

  React.useEffect(() => {
    switch (filter) {
      case "Manager": {
        const a = userdata.filter((item) => item.Dept == "Manager");    
        setfilterdata(a);
        console.log(userdata, a);
        break;
      }

      case "Executive Officer": {
        const a = userdata.filter((item) => item.Dept == "Executive Officer");
        setfilterdata(a);
        console.log(a);
        break;
      }
      case "Junior Officer": {
        const a = userdata.filter((item) => item.Dept == "Junior Officer");
        setfilterdata(a);
        console.log(a);
        break;
      }
      case "Officer": {
        const a = userdata.filter((item) => item.Dept == "Officer");
        setfilterdata(a);
        console.log(a);
        break;
      }
      default:
        {
          setfilterdata(userdata);
        }
        break;
    }
  }, [props.limit,filter]);

  React.useEffect(() => {
    if (sort === "asc") {
      userdata.sort((a, b) => a.Salary - b.Salary);
      console.log(userdata);
      setuserdata(userdata);
      setreload(Date.now());
    } 
    
    else if (sort === "des") {
      userdata.sort((a, b) => b.Salary - a.Salary);
      console.log(userdata);
      setuserdata(userdata);
      setreload(Date.now());
    }
  }, [sort]);

  const removeitem = (id) => {
    axios.delete(`http://localhost:8080/posts/${id}`).then((r) => {
      console.log(r);
    });
    getdata();
  };

  return (
    <div style={{ width: "70%" }} className="table">
      <select name="" id="" onChange={(e) => setfilter(e.target.value)}>
        <option >Filter By Depttment</option>
        <option value="Executive Officer">Executive Officer</option>
        <option value="Manager">Manager</option>
        <option value="Officer">Officer</option>
        <option value="Junior Officer">Junior Officer</option>
      </select>

      <select style={{float:"right" }}  onChange={(e) => setsort(e.target.value)}>
        <option >Sort</option>
        <option value="asc">Ascending</option>
        <option value="des">Descending</option>
      </select>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Address</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th scope="col">Marited</th>
          </tr>
        </thead>
        <tbody>
          {filterdata.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <i
                    onClick={() => {
                      removeitem(item.id);
                    }}
                    className="bi bi-trash3-fill"
                    style={{
                      fontSize: "25px",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      cursor:"pointer"
                    }}
                  ></i>
                </td>
                <td>
                  <img src={item.Profile} style={{width:"100%",height:"60px"}} alt="" />
                </td>
                <td>{item.Name}</td>
                <td>{item.Age}</td>
                <td>{item.Address}</td>
                <td>{item.Dept}</td>
                <td>{item.Salary} Rs.</td>
                <td>{item.MaritalState ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination page={page} setpage={setpage} limits={limit}/>
    </div>
  );
};