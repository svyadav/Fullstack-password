import React, { useState, useEffect, useRef } from "react";
import env from "../environment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { downloadExcel, DownloadTableExcel } from "react-export-table-to-excel";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const tableRef = useRef(null);

  let loadData = async () => {
    let token = await sessionStorage.getItem("token");
    if (token) {
      let res = await axios.get(`${env.apiurl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.statusCode === 200) {
        setData(res.data.data);
      } else {
        alert(res.data.message);
        navigate("/login");
      }
    } else {
      alert("Token not found");
      navigate("/login");
    }
  };

  let handleDelete = async (id) => {
    let token = await sessionStorage.getItem("token");
    if (token) {
      let res = await axios.delete(`${env.apiurl}/users/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.statusCode === 200) {
        loadData();
      } else {
        alert(res.data.message);
      }
    } else {
      navigate("/login");
    }
  };

  // let handleDownloadExcel=async()=>{
  //   let body = [];
  //   data.map((e) => {
  //     body.push({
  //       firstName: e.firstName,
  //       lastName: e.lastName,
  //       Email: e.email,
  //       role: e.role,
  //       createdAt: e.createdAt,
  //     });
  //   });
  //   downloadExcel({
  //       fileName:"users",
  //       sheet:"user",
  //       tablePayload:{
  //           header:["FirstName","LastName","Email","Role","CreatedAt"],
  //           body:data
  //       }
  //   })
  // }


  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div className="dash-wrapper">
        <h1>Welcome to dashboard</h1>
        <p>All your contents here</p>
      </div>
      <div>
        {/* <Button variant="primary" onClick={()=>handleDownloadExcel()}>Download</Button> */}
        
      </div>
      <div>
        <DownloadTableExcel
          filename="users"
          sheet="user"
          currentTableRef={tableRef.current}
        >
          <Button variant="primary">Export table</Button>
        </DownloadTableExcel>
      </div>
      <div>
        <Table striped bordered hover ref={tableRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>{e.createdAt}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(e._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button variant="primary" onClick={() => loadData()}>
          Refresh
        </Button>
      </div>
    </>
  );
};
export default Dashboard;
