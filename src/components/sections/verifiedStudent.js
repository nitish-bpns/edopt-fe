
import "./style.css";
import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from "react";


const Verifystud=(props)=> {
  function getCookie(name) {
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookieValue=0
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const [email,setEmail]=useState(getCookie('email'))
  const [redirecthome,setRedirectHome]=useState(false)

  
  const [verifylist,setVerifylis]=useState([])

  useEffect(()=>{

    axios.get('/verifylis',
    {headers:{
      'verified':true
    },withCredentials:true
  }).then((res)=>{
      setVerifylis(res.data.students)
    }).catch((res)=>{
      setRedirectHome(true)
      alert('something went wrong')
    })
  },[])
  
  const verifyhandler=(e)=>{
    e.preventDefault()
    const index=e.target.value
    axios.get('/verify',{
      headers:{
        'action':'verify',
        'studentid':verifylist[index]._id
      },withCredentials:true
    }).then((res)=>{
      window.location.reload();
    }).catch((res)=>{
      alert('something went wrong contact dev!')
    }) 
  }
  const denyhandler=(e)=>{
    e.preventDefault()
    const index=e.target.value
    axios.get('/verify',{
      headers:{
        'action':'delete',
        'studentid':verifylist[index]._id
      },withCredentials:true
    }) .then((res)=>{
      window.location.reload();
    }).catch((res)=>{
      alert('something went wrong contact dev!')
    }) 
  }


  
  
  return (
    <div style={{ overflowX: "auto", margin: "50px auto" }}>
      <center>
        <h3 style={{ color: "#f1b12a", opacity: "0.8" }}> Verify Students </h3>
      </center>
      <table
        className="approval-table"
        style={{
          color: "black",
          borderCollapse: "collapse",
          width: "80%",
          border: "1px solid black",
          margin: "0 auto",
        }}
      >
        <tbody style={{ border: "1px" }}>
          <tr>
            <th className="student-name">Name</th>
            <th className="student-id">Username</th>
            <th className="student-email">Email</th>
            <th className="donor-name">Phone</th>
            <th className="donor-id">Verify</th>
          </tr>

          {verifylist.length?  
          verifylist.map((student,index)=>{
            return(
              <tr>
            <td>
              <a
                href={"/StudentUpdate/"+student._id}
                style={{ textDecoration: "none", color: "blue" }}
              >
                {student.name}
              </a>
            </td>
            <td>{student.email}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
            <td>
              <button
                onClick={verifyhandler}
                value={index}
                style={{
                  border: "1px solid",
                  backgroundColor: "green",
                  margin: "1%",
                  borderRadius: "20px",
                  padding: "2px 5px",
                }}
              >
                REMOVE
              </button>
             
            </td>
          </tr>
            )
          })
          
          :<p>No students left to verify</p>}
        
        
        
        </tbody>
      </table>
    </div>
  );
}

export default Verifystud