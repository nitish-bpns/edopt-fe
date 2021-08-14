import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";
import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import { Link,Redirect } from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  alignTop,
  invertMobile,
  invertDesktop,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: '',
    paragraph: ''
  };

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );
  
//const [donorToken,setDonorToken]=useState('bearer'+' '+ token)
const [donorData,setDonorData]=useState('') 
const [donorStudents,setDonorStudents]=useState([])
//const [email1,setEmail1]=useState(props.location.state.email)
const [redirecthome,setRedirectHome]=useState(false)

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
useEffect(() => {
    console.log(getCookie('email'))
    if  (email){
    axios.get('/donorDashboard', {
        headers : {
            email:email,
            //authorization: donorToken
        },withCredentials:true
    }).then((response) => {
            //console.log(response.data)
            //console.log(donorToken)
            setDonorData(response.data)
            //setToken(donorToken)

        }).catch((err)=>{
          setRedirectHome(true)
          //console.log('error')
          //alert('error')
        })

        axios.get('/adoptedStudents', {
          headers : {
            email:email,
            //authorization: donorToken
          },withCredentials:true
      }).then((response) => {
              //console.log(response.data)
              setDonorStudents(response.data)
          }).catch((err)=>{
            setRedirectHome(true)
          console.log(err)
          }) 
      }
      else{
        setRedirectHome(true)
      }
}, []);



if (redirecthome){
  return(<Redirect to={{pathname:"/Login_Donor",state:{}}} />)
}
else{

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />

          <div className={splitClasses}>
          <div className="split-item">
          <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item" >
                {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                <p className="m-0">
                  <div className="row">
                      <div className="column">
                        <a href="#" style={{textDecoration:"none", color:"black", marginRight:"3%"}}>eDOPTED</a>  {donorStudents.length}
                      </div>
                      <div className="column">
                      <Link to="/Dashboard2_Donor" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#f1b12a"}}>Show More</Link>
                      </div>
                  </div>
                  <br/>
                  {donorStudents.map((student,index)=>{
                    return (<div>
                      {index+1}. {student.name}
                  </div>)
                  })}
                  <center>{!donorStudents.length?<p>NO STUDENTS YET</p>:''}</center>
                  <br/>
                  <a href="/Feed_Donor" style={{color:"#f1b12a", fontSize:"14px"}}>Adopt More</a>
                </p>
              </div>
              <div className='split-item-image center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <div className="row">
                      <div className="column">
                      &#169; Ace<br/>
                        435353456 <a href="#" style={{color:"#f1b12a", fontSize:"12px", marginLeft:"5px"}}>T&C</a>
                      </div>
                      <div className="column">
                      <Link to="#" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#f1b12a"}}>Gain More</Link>
                      </div>
                    </div>
                    <br/>
                    <div style={{marginBottom:"0.5%"}}>
                        Show Your Karma
                    </div>
                    <div style={{fontSize:"14px"}}>
                        Share On
                    </div>
                    <FooterSocial/>
                </p>
              </div>
          </div>
          </div>


          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom" style={{backgroundColor:"#ffffff", borderRadius:"0", margin:"1%"}}>
              <div className="tiles-item-inner" style={{backgroundColor:"white", borderRadius:"0", border:"1px solid #f1b12a", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                <div>
                <center>
                <img src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png" alt="" style={{width:"2rem", textAlign:"center"}}/>
                </center>
                <h2 style={{margin:"0", color:"black", fontSize:"25px", textAlign:"center"}}>{donorData.name}</h2>
                <br/>
                <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                  City : {donorData.city}<br></br>
                  Pin Code: {donorData.pin}<br></br>
                  Phone no.: {donorData.phone}<br></br>
                </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
}
Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;
