import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";
import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link ,Redirect} from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';


const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: '',
    paragraph: ''
  };
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
            console.log('error')
            }) 
        }
        else{
          setRedirectHome(true)
        }
  }, []);
  

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));    bytes.forEach((b) => binary += String.fromCharCode(b));    return window.btoa(binary);
};

  const photo=(index)=>{
    try{
      let x = donorStudents[index].photo.data.data
      var base64Flag = 'data:image/jpeg;base64,';
      var imageStr = arrayBufferToBase64(x);
      return(base64Flag + imageStr)
    }
    catch{
      return("")
    }
  }
  
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
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <p className="m-0" style={{alignItems:"center"}}>
                  <a href="/Feed_Donor" style={{color:"#f1b12a", fontSize:"14px", margin:"0rem"}}>Adopt More</a>
                  <br/>
                  {donorStudents.map((student,index)=>{
                    return (
                        <div style={{border:"1px solid #f1b12a", padding:"7%", margin:"4% 0%", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1%"}}>
                                    <img  src={photo(index)} alt="" style={{width:"70%"}}/>
                                    <br/>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        {student.name}
                                    </p>
                                    <br/>
                                    <br/>
                                    <Link to={{pathname:"/Dashboard3_Donor",state:{semail:student.email,student:student}}} className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#f1b12a"}}>Show More</Link>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        
                                            Age : {student.age}<br/>
                                            Gender : {student.gender}<br/>
                                            City : {student.city}<br/>
                                            Phone No : {student.phone}<br/>
                                            Class : {student.grade}th<br/>
                                        
                                    </p>
                                </div>
                        </div>
                    </div>
                        

                    )
                  })}
                    
                    
                </p>
              </div>
              <div className='split-item-image center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <center>
                    <a href="#" style={{color:"grey", fontSize:"14px", margin:"0.5rem"}}>Recent Notification</a>
                        <div style={{border:"1px solid #f1b12a", padding:"7%", margin:"4% 0%", width:"80%", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <div className="row" style={{padding:"1%"}}>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        02/08/2021
                                    </p>
                                    </div>
                                <div className="column">
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"16px"}}>
                                        Recent Notification
                                    </p>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                </center>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
}
FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;