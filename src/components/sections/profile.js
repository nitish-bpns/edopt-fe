import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link, Redirect } from "react-router-dom";
import Modal from "../elements/Modal";
import "./style.css";
import FooterSocial from "../layout/partials/FooterSocial";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

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
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const sectionHeader = {
    title: "",
    paragraph: "",
  };
  //console.log(props.location)
  const getid = () => {
    const arr = props.location.pathname.split("/");
    return arr[2];
  };
  const [studentid, setStudentId] = useState(getid());
  const [student, setStudent] = useState({});
  const [redirecthome, setRedirectHome] = useState(false);
  const [found, setFound] = useState(false);

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

  const [requestStatus, setRequestStatus] = useState(0);
  const [status, setStatus] = useState("");
  const [redirectlogin, setRedirectLogin] = useState(false);

  const checkredirected = () => {
    try {
      var x = props.location.state.redirected;
      return true;
    } catch {
      return false;
    }
  };
  const [redirected, setRedirected] = useState(false);
  //console.log(props.location)
  const [donorData, setDonorData] = useState("");

  const [date,setDate]=useState("")
  const [time,setTime]=useState("")

  const [image,setImage]=useState("")
  //alert("Login to Schedule a Meeting!")
  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));    bytes.forEach((b) => binary += String.fromCharCode(b));    return window.btoa(binary);
};
  
  
  useEffect(() => {
    //setRedirected(checkredirected())
    //if (redirected){
    //  re
    //}
    try {
      axios
        .get("/studentdata", {
          headers: {
            id: studentid,
          },
        })
        .then((response) => {
          setStudent(response.data.student);
          setFound(true);
          //console.log(response.data.student.photo)
          try{
          let x = response.data.student.photo.data.data
          var base64Flag = 'data:image/jpeg;base64,';
          var imageStr = arrayBufferToBase64(x);
          setImage(base64Flag + imageStr)
          }
          catch{
            setImage("")
          }
          if (!response.data.status) {
            setRedirectHome(true);
          } else {
            if (email) {
              axios
                .get("/checkapprovel", {
                  headers: {
                    studentid: studentid,
                    donoremail: email,
                  },
                })
                .then((response) => {
                  //console.log(response.data);
                  setRequestStatus(response.data.status);
                  if (response.data.status) {
                    setStatus(response.data.messege);
                  }
                });
              axios
                .get("/donorDashboard", {
                  headers: {
                    email: email,
                    //authorization: donorToken
                  },
                  withCredentials: true,
                })
                .then((response) => {
                  //console.log(response.data);
                  //console.log(donorToken)
                  setDonorData(response.data);
                  //setToken(donorToken)
                });
            }
          }
        })
        .catch((err) => {
          //console.log(err)
          setRedirectHome(true);
        });
    } catch (err) {
      //console.log('error')
      //console.log(err)
      setRedirectHome(true);
    }
  }, []);

  const schedulehandler = () => {
    if (email) {
      
      axios
        .get("/approvalrequest", {
          params: {
            studentid: studentid,
            donoremail: email,
            studentemail: student.email,
            studentname: student.name,
            donorname: donorData.name,
            meetingdate:date,
            meetingtime:time
          },
          withCredentials: true,
        })
        .then((response) => {
          //console.log(response.data);
          alert(response.data.messege);
          window.location.reload();
        });
    } else {
      setRedirectLogin(true);
    }
  };

  if (redirectlogin) {
    alert("login to continue");
    return (
      <Redirect
        to={{
          pathname: "/Login_Donor",
          state: { redirect: "profile/"+studentid, studentid: studentid },
        }}
      />
    );
  }

  //console.log(redirecthome)
  if (redirecthome) {
    alert("no such user exists");
    return <Redirect to={{ pathname: "/Feed_Donor", state: {} }} />;
  } else {
    return (
      <section {...props} className={outerClasses}>
        {/*<div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
  <div className={splitClasses}>*/}

        <div style={{ margin: "30px 0" }}>
          <div className="main-container">
            <div className="upper-div">
              <div className="profile-img">
                
                <img
                  src={found ? image : ""}
                  alt="No images available!!"
                  style={{
                    width: "80%",
                    margin: "5px auto",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="details">
                <center>
                  <h6 style={{ color: "black" }}>
                    {" "}
                    {found ? student.name : ""}{" "}
                  </h6>
                  <h6 style={{ color: "black" }}>
                    {" "}
                    Age : {found ? student.age : ""}{" "}
                  </h6>
                  <p>{requestStatus ? status : ""} </p>
                  {!requestStatus ? 
                  <div  >
                  <Input id="newsletter" type="date" hasIcon="right" placeholder={time} name="name" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}
                  value={date} onChange={(e)=>{setDate(e.target.value)}}>
                    </Input>
                   
                   <Input id="newsletter" type="time" hasIcon="right" placeholder="" name="city" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}
                   value={time} onChange={(e)=>{setTime(e.target.value)}}>
                   </Input>
                 </div>       
                    
                    :''}
                    
                 
                  {status == "approved" ? (
                    <Link
                    to={"/Terms/"+studentid}
                      className="button button-primary button-wide-mobile button-sm schedule-meet-btn"
                      style={{
                        backgroundColor: "#f1b12a",
                        margin: "1%",
                        borderRadius: "20px",
                      }}
                    >
                      Go Ahead!!
                    </Link>
                  ) :  <button
                  onClick={schedulehandler}
                  className="button button-primary button-wide-mobile button-sm schedule-meet-btn"
                  style={{
                    backgroundColor: "#f1b12a",
                    margin: "1%",
                    borderRadius: "20px",
                  }}
                >
                  Schedule Meeting
                </button>}
                </center>
              </div>
            </div>
            <div className="lower-div" style={{ padding: "2%" }}>
              <p>{found ? student.intro : ""}</p>
            </div>
          </div>
        </div>

        {/*} </div>
        </div>
</div>*/}
      </section>
    );
  }
};
FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
