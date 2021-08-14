import React, {useState,useEffect} from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import logo from './../../assets/images/x4.jpg';
import axios from "../../api/axios";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

const sectionHeader = {
    title: '',
    paragraph: ''
  };

function App(props) {
	//const [name, setName] = useState('Mehul')

	const getid = () => {
		const arr = props.location.pathname.split("/");
		return arr[2];
	  };
	  const [studentid, setStudentId] = useState(getid());

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
	  const [redirect,setRedirect]=useState(false)  

	  const [rstatus,setRstatus]=useState(false)
	  const [rmoney,setRmoney]=useState('')


	  useEffect(()=>{
		axios.get('/isapproved',{
		  headers:{
			'email':email
		  },withCredentials:true,
		  params:{
			'studentid':studentid,
			'donoremail':email
		  }
		}).then((res)=>{
		  //console.log(res)
		  if (!res.data.approved){setRedirect(true)}
			else{
				axios.get('/getamount',{
					params:{
						'donoremail':email,
						'studentid':studentid
				},
				headers:{
					'email':email
				},withCredentials:true
			}).then((res)=>{
				if (res.data.status){
					setRmoney(res.data.amount)
					setRstatus(true)
					
				}
				else{
					setRstatus(false)
					setRmoney(res.data.messege)
				}
			})
			}			
		  
		}).catch((err)=>{
		  alert('something went wrong')
		  setRedirect(false)
		})
	  },[])
	

	
	
	
	
	
	
	
	
	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('https://e-dopt.herokuapp.com/payment', { 
			method: 'POST' ,
			headers: {'Content-Type': 'application/json'},
			body:JSON.stringify({
				'email':email,
				'studentid':studentid
		})
	}).then((t) =>
			t.json()
		)

		 

		console.log(data)

		const options = {
			key: 'rzp_test_jqhdiD8zCaaVPs',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			receipt:data.receipt,
			notes:data.notes,
			name: 'Donation',
			description: 'Thank you !!',
			//image: 'http://localhost:3001/logo.svg',
			handler: function (response) {
				//alert(response.messege)
				alert('payment succesfulll' )
				window.location.reload();
				
			
			},
			prefill: {
				
				email: email,
				phone_number: ''
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}


	const donothing=(e)=>{

	}



	return (
		// <div className="App">
		// 	<header className="App-header">
		// 		<p>
		// 			Edit <code>src/App.js</code> and save to reload.
		// 		</p>
		// 		<a
		// 			onClick={displayRazorpay}
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 		>
		// 			Donate $5
		// 		</a>
		// 	</header>
		// </div>
        <section>
        <div className="container" style={{alignItems:"center"}}>
          <div>
            <SectionHeader data={sectionHeader} className="center-content" />
              <center>
                <br/><br/>
                <h2>Payments</h2>
				<p>{rstatus?"AmountRequired:  INR- "+rmoney:"No Money Requested Yet"}</p>
                <img src={logo} className="App-logo" alt="logo" style={{width:"30%"}}/>
                {/* <p className="m-0" style={{fontSize:"14px", textAlign:"center"}}>
                    Click the following button!
                </p> */}
                <br/>
                <button  onClick={rstatus?displayRazorpay:donothing} target="_blank" rel="noopener noreferrer" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#f1b12a", margin:"1%", borderRadius:"20px"}}>Donate</button>
                <a href="/Declaration" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#f1b12a", margin:"1%", borderRadius:"20px"}}>Cancel</a>
              </center>
              <br/>
          </div>
        </div>
      </section>
	)
}

export default App