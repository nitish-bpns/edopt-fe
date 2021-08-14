import React from 'react';
import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link,Redirect } from 'react-router-dom';
import Modal from '../elements/Modal';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker'

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

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const sectionHeader = {
    title: '',
    paragraph: ''
  };
  // alert("Login to Schedule a Meeting!")

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
      
    }).catch((err)=>{
      alert('something went wrong')
      setRedirect(true)
    })
  },[])
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [is_uploaded,setis_uploaded]=useState(false)
    const uploadFile = (event) => {
        setSelectedFile(event.target.files[0])
        let formData = new FormData();
        formData.append('file_uploaded', selectedFile)
        axios.post('/upload', formData)
            .then(response => {
                document.getElementById('loader_message').innerText = "File Successfully Uploaded!"
                setis_uploaded(true)
            })
    }




  if (redirect){
    return <Redirect to={{ pathname: "/Feed_Donor", state: {} }} />;
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
            <center>
            <h2>Declarations</h2>
            <p className="m-0" style={{fontSize:"14px", textAlign:"left"}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="m-0" style={{fontSize:"14px", textAlign:"left"}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <br/><br/>
            <Input onChange={(event)=>{uploadFile(event)}} type="file" style={{borderRadius:"20px", borderColor:"grey", color:"grey"}}/>
            <div id="loader_message" style={selectedFile?{display: 'inline'}:{display: 'none'}}>File is uploading, Please wait...</div>
            <br/>
            <a href={is_uploaded?"/Pay/"+studentid:''} className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#f1b12a", margin:"1%", borderRadius:"20px"}}>Pay Now</a>
            <a href={"/Terms/"+studentid} className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#f1b12a", margin:"1%", borderRadius:"20px"}}>Cancel</a>
            </center>
        </div>
      </div>
    </section>
  );
}
}
FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;