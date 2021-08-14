import {useState, useEffect,useContext} from 'react';
import axios from "../../api/axios";
import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link,Redirect } from 'react-router-dom';
import './style.css'
import FooterSocial from '../layout/partials/FooterSocial';
import { Chart } from "react-google-charts";

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const Testimonial = ({
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
  
  console.log(props);

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

  const [donorStudents,setDonorStudents]=useState([])
  const [studentMarklist,setStudentMarklist]=useState([])
  const [cumulativeMarks, setCumulativeMarks] = useState([]);
  const [percentageMarks, setPercentageMarks] = useState([]);   
  const [redirecthome,setRedirectHome]=useState(false)
  
  //console.log(props.location.state)
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
  const [student,setStudent]=useState({})
  const [semail,setSemail]=useState('')

  useEffect(() => {
    try {
        setStudent(props.location.state.student)
        setSemail(props.location.state.semail)
      
    axios.get('/getMarks', {
        headers : {
            email:props.location.state.semail,
        },withCredentials:true
    }).then((response) => {
            //console.log(response.data)
            //console.log(index)
            //console.log(student)
            setStudentMarklist(response.data)
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
                //console.log(total_marks)
               //console.log(percentage_marksheet)
                //console.log(cumulative_marksheet)
                setCumulativeMarks(cumulative_marksheet)
                setPercentageMarks(percentage_marksheet)
            
        })
        .catch((err)=>{
            setRedirectHome(true)
            //console.log(err)
            //console.log('hi')
          })
        }
        catch (error) {
            setRedirectHome(true)
            //console.log(error)
        }  
       

  }, []);

  useEffect(() => {
    axios.get('/adoptedStudents', {
        headers : {
            email:email,
        },withCredentials:true
    }).then((response) => {
            //console.log(response.data)
            setDonorStudents(response.data)
            //console.log(response.data.length)
            
          
        }).catch((err)=>{
            setRedirectHome(true)
          })
    
        

  }, []);

  if (redirecthome){
    return(<Redirect to={{pathname:"/Dashboard2_Donor",state:{}}} />)
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
          <center>
           <a href="#" style={{color:"#f1b12a", fontSize:"14px", margin:"0rem"}}>Academics</a>
           </center>
           <div className="abc">
                        <div className="split-item" style={{alignItems:"center"}}> 
                                <div className="split-item-content center-content-mobile" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{fontSize:"14px"}}>
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
                                    </p>
                                </div>
                                <div className="split-item-image center-content-mobile" style={{padding:"1%"}}>
                                <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        <div className="row">
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Subjects
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Number
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Test 1
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Test 2
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                Cumulative
                                            </div>
                                        </div>
                                    </p>
                                    <br/>
                                    {studentMarklist.map((subject,index)=>{
                                        let cumulative = (parseFloat(subject.marks[0]) + parseFloat(subject.marks[1]))/2
                                        return (<p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        <div className="row">
                                            <div className="column2" style={{textAlign:"left"}}>
                                                {subject.subject}
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                {index}
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                {subject.marks[0]}
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                {subject.marks[1]}
                                            </div>
                                            <div className="column2" style={{textAlign:"left"}}>
                                                {cumulative}
                                            </div>
                                            {/* <div className="column2" style={{textAlign:"center"}}>
                                                XX
                                            </div> */}
                                        </div>
                                    </p>
                                    )
                                    
                                    })}
                                    
                                   
                                    <Link to={{pathname:"/Dashboard4_Donor",state:{semail:semail,student:student}}} className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#f1b12a"}}>Show More</Link>
                                   
                                </div>
                        </div>
            </div>


           <center>
           <a href="#" style={{color:"#f1b12a", fontSize:"14px", margin:"0rem"}}>Journal</a>
           </center>
           <div style={{padding:"3%", margin:"1% 0% 4% 0", border:"1px solid #f1b12a", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                        <div className="row" style={{alignItems:"center"}}> 
                                <div className="column2" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        02/08/2021
                                    </p>
                                </div>
                                <div className="column1" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu fugiat.
                                    </p>
                                </div>
                        </div>
                        <div className="row" style={{alignItems:"center"}}> 
                                <div className="column2" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        02/08/2021
                                    </p>
                                </div>
                                <div className="column1" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu fugiat.
                                    </p>
                                </div>
                        </div>
                        <br/>
                        <div className="row" style={{alignItems:"center"}}> 
                                <div className="column1" style={{padding:"1%"}}>
                                    <Input id="newsletter" type="name" hasIcon="right" name="pin" style={{borderRadius:"20px", borderColor:"grey"}}>  
                                    </Input>
                                </div>
                                <div className="column2" style={{padding:"1%"}}>
                                    <Link to="#" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#f1b12a"}}>Send</Link>
                                </div>
                        </div>
            </div>


            <div style={{padding:"3%", margin:"4% 0%"}}>
                        <div className="row" style={{alignItems:"center"}}> 
                                <div className="column" style={{padding:"1%"}}>
                                    <center>
                                    <img src={student.photo} alt="" style={{width:"50%"}}/>
                                    </center>
                                    <br/>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                    {student.intro}<br/>Guardian Name:{student.guardianName } <br/>
                                    Guardian Age: {student.guardianAge}<br/>Guardian gender: {student.guardianGender}<br/>Guardian phone: {student.guardianPhone}<br/>Relation: {student.guardianRelation}<br/>Address: {student.address}
                                    </p><br/>
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