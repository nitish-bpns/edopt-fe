import React from 'react'
import './style.css'

export default function payment_history() {
    return (
        <div style= {{overflowX: "auto"}}>
            <center>
            <h3 style={{color: "#f1b12a"}}> Payment History </h3>
        </center>
        <table className="payment-history-table" style= {{color: "black",borderCollapse: "collapse", width: "80%", border: "1px solid black", margin: "0 auto"}}>
        <tbody style= {{border: "1px"}}>
        <tr> 
            <th colspan="3">Student</th> 
            <th colspan="3">Donor</th>
            <th colspan="2">Payment Done</th>  
        </tr> 
        <tr> 
            <th className= "student-name">Name</th> 
            <th className= "student-id">ID</th> 
            <th className= "student-email">Email</th> 
            <th className= "donor-name">Name</th> 
            <th className= "donor-id">ID</th> 
            <th className= "donor-email">Email</th>
            <th className= "donor-email">Date</th>
            <th className= "donor-email">Amount</th>

        </tr> 
        <tr> 
            <td>Yash</td> 
            <td>852548</td> 
            <td>hbsv@gmail.com</td> 
            <td>Yogesh</td> 
            <td>77548</td> 
            <td>yogesh@gmail.com</td> 
            <td> 07-07-2021 </td>
            <td> Rs. 5000 </td>
        </tr><tr> 
            <td>Yash</td> 
            <td>852548</td> 
            <td>hbsv@gmail.com</td> 
            <td>Yogesh</td> 
            <td>77548</td> 
            <td>yogesh@gmail.com</td> 
            <td> 08-07-2021 </td>
            <td> Rs. 5000 </td>
        </tr><tr> 
            <td>Yash</td> 
            <td>852548</td> 
            <td>hbsv@gmail.com</td> 
            <td>Yogesh</td> 
            <td>77548</td> 
            <td>yogesh@gmail.com</td> 
            <td> 10-07-2021 </td>
            <td> Rs. 5000 </td>
        </tr>

        </tbody>
      </table>
        </div>
    )
}
