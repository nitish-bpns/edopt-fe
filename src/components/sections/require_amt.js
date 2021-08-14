import React from 'react'
import './style.css'
import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";
import { update } from 'lodash';
import { Link, Redirect } from "react-router-dom";

const  Require_amt=(props)=> {
    
    const [redirect,setRedirect]=useState(false)
    const [amount,setAmount]=useState('')
    const [list,setList]=useState([])
    useEffect(()=>{
        axios.get('/getamountlist',{
            withCredentials:true
        })
       .then((res)=>{
            //console.log(res.data)
            setList(res.data.data)
            setAmount(res.data.amountleft)
        }).catch((err)=>{
            setRedirect(true)
        })
    },[])

    const updatehandler=(e)=>{
        e.preventDefault()
        const index=e.target.value
        axios.get('/setamount',{
            params:{
                'donoremail':list[index].donoremail,
                'studentid':list[index].studentid,
                'amount':document.getElementById(index).value
            },withCredentials:true
        }).then((res)=>{
            //console.log(res.data)
            window.location.reload();
        })
    }
    
    if (redirect){
        return(<Redirect to={{pathname:"/AdminLogin",state:{}}} />)
    }

    else{
    return (
        
        <div style= {{overflowX: "auto"}}>
            <center>
            <h3 style={{color: "#f1b12a"}}> Amount Required </h3>
        </center>
        <table className="require-amount-table" style= {{color: "black",borderCollapse: "collapse", width: "80%", border: "1px solid black", margin: "0 auto"}}>
        <tbody style= {{border: "1px"}}>
        <tr> 
            <th colspan="3">Student</th> 
            <th colspan="3">Donor</th>
            <th colspan="2" rowSpan= "2">Amount Required</th> 
            <th colspan="1" rowSpan="2">total amount paid</th>
            
        </tr> 
        <tr> 
            <th className= "student-name">Name</th> 
            <th className= "student-id">ID</th> 
            <th className= "student-email">Email</th> 
            <th className= "donor-name">Name</th> 
            <th className= "donor-id">ID</th> 
            <th className= "donor-email">Email</th>
            

        </tr> 
        {list.length?list.map((item,index)=>{
        return(
        <tr> 
        <td>{item.studentname}</td> 
        <td>{item.studentid}</td> 
        <td>{item.studentemail}</td> 
        <td>{item.donorname}</td> 
        <td>NA</td> 
        <td>{item.donoremail}</td> 
        <td>
         <input id={index}  type="text" name="amount-rqrd" placeholder={item.amountleft} read-write style= {{border: "none"}}/>
        </td>
        <th>
        <button value={index} onClick={updatehandler}  style={{backgroundColor:"green", margin:"1%", borderRadius:"20px", padding: "2px 5px"}}>Update</button>
        </th>
        <td>{item.amountpaid?item.amountpaid:0}</td>
    </tr>
        )    
})
    :<p>NO entries yet!</p>}
        
        
       

        </tbody>
      </table>
        </div>
    )
}
}
export default Require_amt