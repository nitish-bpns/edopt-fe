import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import { Link, Redirect } from "react-router-dom";
import Input from "../elements/Input";
import "./style.css";
import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from "react";
import { set } from 'lodash';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}
const StudentUpdate=({
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
})=> {
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
    paragraph: '-'
  };
  
  function getCookie(name) {
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookieValue = 0;
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const [email, setEmail] = useState(getCookie("email"));
  
  
  const getid = () => {
    const arr = props.location.pathname.split("/");
    return arr[2];
  };
  const [studentid, setStudentId] = useState(getid());
  
  const[student,setStudent]=useState({})
  
  const [studentName, setStudentName] = useState('');
  const [studentUserName, setStudentUserName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentGender, setStudentGender] = useState('');
  const [studentCity, setStudentCity] = useState('');
  const [studentPincode, setStudentPincode] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentStandard, setStudentStandard] = useState('');
  const [studentIntroduction, setStudentIntroduction] = useState('');
  const [studentBody, setStudentBody] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianAge, setGuardianAge] = useState('');
  const [guardianGender, setGuardianGender] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');
  const [guardianWants, setGuardianWants] = useState('');
  const [guardianNeeds, setGuardianNeeds] = useState('');
  
  const [is_adopted,setIsadopted]=useState(false)
  const [verified,setVerified]=useState(true)
  
  const [redirect,setRedirect]=useState(false)
  const [loaded,setLoaded]=useState(false)
  useEffect(()=>{
    axios.get('/admin/studentdata',{
      headers:{
        'email':email,
        'id':studentid
      },withCredentials:true
    }).then((res)=>{
      //console.log(res.data.student)
      setStudent(res.data.student)
      setLoaded(true)
      setStudentName(res.data.student.name)
      setStudentUserName(res.data.student.email)
      setStudentAge(res.data.student.age)
      setStudentGender(res.data.student.gender)
      setStudentCity(res.data.student.city)
      setStudentPincode(res.data.student.pin)
      setStudentPhone(res.data.student.phone)
      setStudentStandard(res.data.student.grade)
      setStudentIntroduction(res.data.student.intro)
      setStudentBody(res.data.student.body)
      setGuardianName(res.data.student.guardianName)
      setGuardianAge(res.data.student.guardianAge)
      setGuardianGender(res.data.student.guardianGender)
      setGuardianPhone(res.data.student.guardianPhone)
      setGuardianRelation(res.data.student.guardianRelation)
      setGuardianAddress(res.data.student.address)
      setGuardianWants(res.data.student.aim)
      setGuardianNeeds(res.data.student.requirements)
     
      setIsadopted(res.data.student.is_adopted) 
      setVerified(res.data.student.verified)
    }).catch((err)=>{
      setRedirect(true)
    })
  },[])
  
 
  
 

  const signUpStudent = (e)=>{
    e.preventDefault()
    console.log("Hello")
    axios.post('/admin/editdata', {
        name: studentName,
        email: studentUserName,
        age: studentAge,
        gender: studentGender,
        address: guardianAddress,
        city: studentCity,
        pin: studentPincode,
        phone: studentPhone,
        guardianName: guardianName,
        guardianAge: guardianAge,
        guardianGender: guardianGender,
        guardianPhone: guardianPhone,
        guardianRelation: guardianRelation,
        grade: studentStandard,
        intro: studentIntroduction,
        body: studentBody,
        aim: guardianNeeds,
        requirements: guardianWants,
        is_adopted:is_adopted,
        verified:verified,
        _id:studentid

    },{withCredentials:true}).then((res)=>{
      //console.log(res.data)
      if (res.data.status){
        window.location.reload()
      }
      else{
        alert('invalid data sent')
      }
     
    }).catch((res)=>{
      alert('something went wrong')
    })
  }

  
  const [newpassword,setNewpassword]=useState('')
  const passhandler=(e)=>{
    console.log(newpassword)
    axios.get('/admin/changepasswordstd',{headers:{
      'id':studentid,
      'password1':newpassword
    },withCredentials:true}).then((res)=>{
      console.log(res.data)
      if (res.data.status){
        alert('password changed successfuly')
        window.location.reload()
      }
      else{
        alert('something went wrong')
      }
    }).catch((err)=>{
      console.log(err)
      alert('something  wrong')
    })
  }
  const [selectedFile, setSelectedFile] = useState(null);

    const uploadFile = (event) => {
        setSelectedFile(event.target.files[0])
        let formData = new FormData();
        formData.append('file', selectedFile)
        axios.post('/imageupload', formData,{headers:{id:studentid},withCredentials:true})
            .then(response => {
                document.getElementById('loader_message').innerText = "File Successfully Uploaded!"
            })
    }


    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));    bytes.forEach((b) => binary += String.fromCharCode(b));    return window.btoa(binary);
  };
  
    const photo=()=>{
        //console.log(userToken)
        let x = student.photo.data.data
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayBufferToBase64(x);
        return(base64Flag + imageStr)
  
    }

  if (redirect){
    return(<Redirect to={{pathname:"/AdminLogin",state:{}}} />)
}
else{
  return (
    <div className="Student-update" style={{ marginTop: "120px" }}>
      <div className="studentDetails">
        <div className="profile">
          <img
            src={loaded?photo():""}
            alt=""
            style={{
              height: "200px",
              margin: "5px auto",
              borderRadius: "5px",
            }}
          />
        </div>
        <center>
          <div className="Details">
            <h6 style={{ color: "black" }}> {student.name} </h6>
            <h6 style={{ color: "black" }}> {student.age} </h6>
          </div>
        </center>
      </div>
      <form onSubmit={signUpStudent} >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content">
              <h2>Student Information</h2>
            </SectionHeader>
        

            <div className={splitClasses}>

<div className="split-item">
    <div className="split-item-content center-content-mobile reveal-from-left"
         data-reveal-container=".split-item">
        <p className="m-0">
            <p className="m-0">Your Information</p>
            <div className="row" style={{marginTop: "2%"}}>
                <div className="column" style={{paddingRight: "1%"}}>
                    <Input id="newsletter" type="name" value={studentName} onChange={(e)=>{setStudentName(e.target.value)}} hasIcon="right" placeholder="Your Name"
                           name="name"
                           style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
                    </Input>
                    <label for="name">Name</label>
                    
                </div>
                <div className="column" style={{paddingLeft: "1%"}}>
                    <Input id="newsletter" type="username" value={studentUserName} onChange={(e)=>{setStudentUserName(e.target.value)}} hasIcon="right" placeholder="Username"
                           name="name"
                           style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
                    </Input>
                    <label for="username">Username or Email</label>
                </div>
            </div>
            <div className="row" style={{marginTop: "2%"}}>
                <div className="column" style={{paddingRight: "1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right"
                           placeholder="Your Age" name="age" style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey"
                    }}
                    onChange={(e)=>{setStudentAge(e.target.value)} } value={studentAge}
                    >
                    </Input>
                    <label for="username">Age</label>
                </div>
                <div className="column" style={{paddingLeft: "1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right"
                           placeholder="Your Gender" name="gender" style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey"
                    }}
                    onChange={(e)=>{setStudentGender(e.target.value)} } value={studentGender}
                    >
                    </Input>
                    <label for="gender">Gender</label>
                </div>
            </div>
            <div className="row" style={{marginTop: "2%"}}>
                <div className="column" style={{paddingRight: "1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right"
                           onChange={(e)=>{setStudentCity(e.target.value)} } value={studentCity}
                           placeholder="Your City" name="city" style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey"
                    }}>
                    </Input>
                    <label for="city">City</label>
                </div>
                <div className="column" style={{paddingLeft: "1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right"
                           onChange={(e)=>{setStudentPincode(e.target.value)} } value={studentPincode}
                           placeholder="Your Pincode" name="pin" style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey"
                    }}>
                    </Input>
                    <label for="pin">PIN</label>
                </div>
            </div>
            <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Phone"
                   name="phone"
                   onChange={(e)=>{setStudentPhone(e.target.value)} } value={studentPhone}
                   style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
            </Input>
            <label for="phone">Phone</label>
            <Input id="newsletter" type="number" hasIcon="right" placeholder="Your Standard"
                   onChange={(e)=>{setStudentStandard(e.target.value)} } value={studentStandard}
                   name="standard"
                   style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
            </Input>
            <label for="standard">Class/Standard</label>
            
            <br/>
            <br/>
            <Input id="newsletter" type="name" hasIcon="right"
                   onChange={(e)=>{setStudentIntroduction(e.target.value)} } value={studentIntroduction}
                   placeholder="Your Introduction (50 Words)" name="intro" style={{
                marginTop: "4%",
                borderRadius: "20px",
                borderColor: "grey",
                height: "5rem"
            }}>
            </Input>
            <label for="intro">Intro</label>
            <Input id="newsletter" type="name" hasIcon="right"
                   onChange={(e)=>{setStudentBody(e.target.value)} } value={studentBody}
                   placeholder="Body (150 Words)" name="body" style={{
                marginTop: "4%",
                borderRadius: "20px",
                borderColor: "grey",
                height: "7rem"
            }}>
            </Input>
            <label for="body">Body</label>
        </p>
    </div>
    <div className={
        classNames(
            'split-item-image center-content-mobile reveal-from-bottom',
            imageFill && 'split-item-image-fill'
        )}
         data-reveal-container=".split-item">
        {/* <Image
src={require('./../../assets/images/eDOPT.png')}
alt="Features split 01"
width={528}
height={396} /> */}
        <p className="m-0">
            <p className="m-0">Guardian's Information</p>
            <Input id="newsletter" type="name" hasIcon="right" placeholder="Guardian's Name"
                   name="name"
                   onChange={(e)=>{setGuardianName(e.target.value)} } value={guardianName}  
                   style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
            </Input>
            <label for="name">Name</label>
            <div className="row" style={{marginTop: "2%"}}>
                <div className="column" style={{paddingRight: "1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right"
                           onChange={(e)=>{setGuardianAge(e.target.value)} } value={guardianAge}
                           placeholder="Guardian's Age" name="age" style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey"
                    }}>
                    </Input>
                    <label for="age">Age</label>
                </div>
                <div className="column" style={{paddingLeft: "1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right"
                           onChange={(e)=>{setGuardianGender(e.target.value)} } value={guardianGender}
                           placeholder="Guardian's Gender" name="gender" style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey"
                    }}>
                    </Input>
                    <label for="gender">Gender</label>
                </div>
            </div>
            <Input id="newsletter" type="name" hasIcon="right"
                   placeholder="Guardian's Phone" name="phone"
                   onChange={(e)=>{setGuardianPhone(e.target.value)} } value={guardianPhone}
                   style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
            </Input>
            <label for="phone">Phone</label>
            <Input id="newsletter" type="name" hasIcon="right" placeholder="Relation"
                   name="relation"
                   onChange={(e)=>{setGuardianRelation(e.target.value)} } value={guardianRelation}
                   style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
            </Input>
            <label for="relation">Relation</label>
            <Input id="newsletter" type="name" hasIcon="right" placeholder="Address"
                   name="address"
                   onChange={(e)=>{setGuardianAddress(e.target.value)} } value={guardianAddress}
                   style={{marginTop: "4%", borderRadius: "20px", borderColor: "grey"}}>
            </Input>
            <label for="address">Address</label>
            <br/>
            <br/>
            <Input id="newsletter" type="name" hasIcon="right"
                   onChange={(e)=>{setGuardianWants(e.target.value)} } value={guardianWants}
                   placeholder="Your Wants (50 Words)" name="wants" style={{
                marginTop: "2%",
                borderRadius: "20px",
                borderColor: "grey",
                height: "5rem"
            }}>
              <label for="wants">Aim/wants</label>
            </Input>
            <Input id="newsletter" type="name" hasIcon="right"
                   onChange={(e)=>{setGuardianNeeds(e.target.value)} } value={guardianNeeds}
                   placeholder="Your Needs (150 Words)" name="needs" style={{
                marginTop: "3%",
                borderRadius: "20px",
                borderColor: "grey",
                height: "7rem"
            }}>
            </Input>
            <label for="needs">needs/requirements</label>
        </p>
        
    </div>
</div>
{/* <center>
<br />
<div className="row">
<div className="columnl">
<Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #3d946e", color: "#3d946e", width: "95%" }}>Google</Link>
</div>
<div className="columnl">
<Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #3d946e", color: "#3d946e", width: "95%" }}>Instagram</Link>
</div>
<div className="columnl">
<Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #3d946e", color: "#3d946e", width: "95%" }}>Facebook</Link>
</div>
</div>
</center>
<br /> */}
<center>
    <button type="submit" className="button button-primary button-wide-mobile button-sm"
          style={{backgroundColor: "#f1b12a", borderRadius: "20px"}}>update</button>
    
</center>
</div>
<div>
         
        </div>
        <br></br>
        

          </div>
        </div>
      </form>
      <div style={{alignItems:"center"}}>
        <p>Upload Image here</p>
                              <img src="file.png" alt="" style={{width:"35%", textAlign:"center"}}/>
                              
                              <Input type="file" style={{borderRadius:"20px", borderColor:"grey", color:"grey"}}
                              onChange={(event)=>{uploadFile(event)}}/>
                               <div id="loader_message" style={selectedFile?{display: 'inline'}:{display: 'none'}}>File is uploading, Please wait...</div>
                            </div>

      <div>
          <input onChange={(e)=>{setNewpassword(e.target.value)}} placeholder="newpassword"></input>
          <button onClick={passhandler}>change</button>
        </div>
      
    </div>
  );
}}
export default StudentUpdate