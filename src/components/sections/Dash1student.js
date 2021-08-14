import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";
import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link,Redirect} from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import { Chart } from "react-google-charts";

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


  const [cumulativeMarks, setCumulativeMarks] = useState([]);
  const [percentageMarks, setPercentageMarks] = useState([]);
  const [userToken,setUserToken]=useState({})
  const [redirecthome,setRedirectHome]=useState(false)
  const [is_adopted,setis_adopted]=useState(false)
  const [donor,setDonor]=useState({})

  const [loaded,setLoaded]=useState(false)

  

  useEffect(() => {
    //console.log(Token)
    axios.get('/getMarks', {
        headers : {
            email : email
        },withCredentials:true
    })
        .then(response => {
          
            //console.log(response.data)
            let cumulative_marksheet = []
            let percentage_marksheet = []
            let total_marks = 0;
            for (let i=0; i < response.data.length; i++){
                let subject = response.data[i]
                let sum_of_marks = 0;
                let j;
                for (j=0; j < subject.marks.length; j++){
                    sum_of_marks += parseFloat(subject.marks[j])
                }
                let cumulative = sum_of_marks/j
                total_marks += cumulative
                cumulative_marksheet[i] = [subject.subject, cumulative]
            }
            percentage_marksheet[0] = ['Task', '100']
            for (let k=1; k < cumulative_marksheet.length+1; k++){
                percentage_marksheet[k] = [cumulative_marksheet[k-1][0], (cumulative_marksheet[k-1][1]/total_marks)*100]
            }
            //console.log(percentage_marksheet)
            //console.log(cumulative_marksheet)
            setCumulativeMarks(cumulative_marksheet)
            setPercentageMarks(percentage_marksheet)
        })
        .catch((err)=>{
          setRedirectHome(true)
          //console.log('error')
          //alert('error')
        })
}, []);
useEffect(() => {
  axios.get('/studentProfile', {
      headers : {
        email : email
      },withCredentials:true
  }).then((response) => {
          //console.log(response.data)
          setUserToken(response.data)
          setLoaded(true)
          //console.log(response.data.is_adopted)
          if (response.data.is_adopted){
            axios.get('/getmydonor',{
              headers:{
                email:email,
                donoremail:response.data.donoremail,
                studentid:response.data.id
              },withCredentials:true
            }).then((response)=>{
              //console.log(response.data)
              setis_adopted(true)
              setDonor(response.data.donordata)
            })
          }

      })
      .catch((err)=>{
        setRedirectHome(true)
        //console.log('error')
        //alert('error')
      })
}, []);


const [selectedFile, setSelectedFile] = useState(null);

    const uploadFile = (event) => {
        setSelectedFile(event.target.files[0])
        let formData = new FormData();
        formData.append('file_uploaded', selectedFile)
        axios.post('/upload', formData)
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
        let x = userToken.photo.data.data
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayBufferToBase64(x);
        return(base64Flag + imageStr)
  
    }


if (redirecthome){
  return(<Redirect to={{pathname:"/Login_Student",state:{}}} />)
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
                  <br/>
                    <div style={{border:"1px solid #f1b12a", padding:"7%", margin:"4% 0%", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1% 1% 1% 0%"}}>
                                    <center>
                                    <img src={loaded?photo():""} alt="" style={{width:"70%"}}/>
                                    </center>
                                    <p className="text-sm mb-0" style={{textAlign:"center", fontSize:"14px"}}>
                                      {userToken.name}
                                    </p>
                                    <br/>
                                    <br/>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                    Age: {userToken.age}<br/>Gender: {userToken.gender}<br/>City: {userToken.city}<br/>Pin code: {userToken.pin}<br/>Phone no.: {userToken.phone}<br/>Standard: {userToken.grade}

                                    </p>
                                </div>
                        </div>
                    </div>
                    <div style={{border:"1px solid #f1b12a", padding:"7%", margin:"4% 0%", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                        
                        {is_adopted?
                        <div className="row"> 
                                <div className="column" style={{padding:"1% 1% 1% 0%"}}>
                                    <center>
                                    <img src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png" alt="" style={{width:"2rem"}}/>
                                    </center>
                                    <p className="text-sm mb-0" style={{textAlign:"center", fontSize:"14px"}}>
                                    Name: {donor.name}
                                    </p>
                                    <br/>
                                    <br/>
                                    <center>
                                    <button  className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#f1b12a"}}>DONOR </button>
                                    </center>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                    Age: {donor.age}<br/>gender: {donor.gender}<br/>phone: {donor.phone}<br/> email: {donor.email}<br/>Address: {donor.address}

                                    </p>
                                </div>
                        </div>
                        
                        :<center><h3>NOT ADOPTED YET</h3></center>}
                    </div>
                </p>
              </div>
              <div className=' center-content-mobile reveal-from-bottom' data-reveal-container=".split-item" style={{paddingLeft:"2%"}}>
                <p className="m-0">
                    <center>
                        <div style={{border:"1px solid #f1b12a", padding:"7%", margin:"4% 0%", width:"80%", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                          <center>
                          <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={percentageMarks}
                            options={{
                              title: 'Cumulative: 100',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                            </center>
                            <br/>
                            <p className="text-sm mb-0" style={{fontSize:"14px"}}>
                              {userToken.requirements}
                            </p>
                            <br/>
                            <br/>
                            <div style={{alignItems:"center"}}>
                              <img src="file.png" alt="" style={{width:"35%", textAlign:"center"}}/>
                              <br/>
                              <Input type="file" style={{borderRadius:"20px", borderColor:"grey", color:"grey"}}
                              onChange={(event)=>{uploadFile(event)}}/>
                               <div id="loader_message" style={selectedFile?{display: 'inline'}:{display: 'none'}}>File is uploading, Please wait...</div>
                            </div>
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