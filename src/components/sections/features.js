import React from 'react'
import './style.css'

export default function features() {
  return (
    <div style={{margin: "30px 0"}}>
    <div className= "main-container">
      <div className= "upper-div" >
        <div className= "profile-img">
          <img src={require('./../../assets/images/i3.jpg')} alt="" style={{width:"80%", margin: "5px auto", borderRadius: "5px"}} />
        </div>
        <div className= "details">
          <center>
          <h6 style= {{color: "black"}}> Vinay Mishra </h6>
          <h6 style= {{color: "black"}}> Age : 16 </h6>
          <a href="/" className="button button-primary button-wide-mobile button-sm schedule-meet-btn" style={{backgroundColor:"#f1b12a", margin:"1%", borderRadius:"20px"}}>Schedule a Meeting</a>
          </center>
        </div>
      </div>
      <div className= "lower-div" style={{padding: "2%"}}>
        <p>I need financial assistance to complete my school. I am a topper of my class. Everyone loves me because of my polite nature. Now things have changed, we have no resource to complete my schooling. I am looking for my virtual parent here who will take care of my studies. I will prove myself and will forever be grateful to person who will help me.
</p>
      </div>
    </div>
    </div>
  )
}
