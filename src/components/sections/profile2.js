import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link, Redirect } from "react-router-dom";
import Modal from "../elements/Modal";
import "./style.css";
import FooterSocial from "../layout/partials/FooterSocial";
import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from "react";

function toggleVideo() {
  // get the Video
  var myVideo = document.getElementById("stu-video");

  // get the current value of the video's display property
  var displaySetting = myVideo.style.display;

  // also get the video button, so we can change what it says
  var VideoButton = document.getElementById("videoButton");

  // now toggle the video and the button text, depending on current state
  if (displaySetting == "block") {
    // video is visible. hide it
    myVideo.style.display = "none";
    // change button text
    VideoButton.innerHTML = "Show Student Video";
  } else {
    // video is hidden. show it
    myVideo.style.display = "block";
    // change button text
    VideoButton.innerHTML = "Hide Student Video";
  }
}

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
  //alert("Login to Schedule a Meeting!")
  console.log(props);
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
  //alert("Login to Schedule a Meeting!")
  useEffect(() => {
    try {
      console.log(studentid);
      axios
        .get("/studentdata", {
          headers: {
            id: studentid,
          },
        })
        .then((response) => {
          setStudent(response.data.student);
          setFound(true);
          console.log(response.data);
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
                  console.log(response.data);
                });
            }
          }
        })
        .catch((err) => {
          console.log("errorsdfgh");
          setRedirectHome(true);
        });
    } catch (err) {
      console.log("error");
      setRedirectHome(true);
    }
  }, []);
  console.log(redirecthome);
  if (redirecthome) {
    alert("no such user exists");
    return <Redirect to={{ pathname: "/Feed_Donor", state: {} }} />;
  } else {
    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={splitClasses}>
              <div className="split-item">
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                  style={{ alignItems: "center" }}
                >
                  <p className="m-0" style={{ alignItems: "center" }}>
                    <a
                      href="/Feed_Donor"
                      style={{
                        color: "#f1b12a",
                        fontSize: "14px",
                        margin: "0rem",
                      }}
                    >
                      Adopt More
                    </a>
                    <br />
                    <div
                      style={{
                        border: "1px solid #f1b12a",
                        padding: "7%",
                        margin: "4% 0%",
                        borderRadius: "20px",
                        boxShadow: "5px 5px #f1f1f1",
                      }}
                    >
                      <div className="row">
                        <div
                          className="column"
                          style={{ padding: "1% 1% 1% 0%" }}
                        >
                          <center>
                            <img
                              src={found ? student.photo : ""}
                              alt=""
                              style={{ width: "70%" }}
                            />
                          </center>
                          <p
                            className="text-sm mb-0"
                            style={{ textAlign: "center", fontSize: "14px" }}
                          ></p>
                          <br />
                          <br />
                        </div>
                        <div className="column" style={{ padding: "1%" }}>
                          <p
                            className="text-sm mb-0"
                            style={{ textAlign: "left", fontSize: "14px" }}
                          >
                            I need financial assistance to complete my school. I
                            am a topper of my class. Everyone loves me because
                            of my polite nature. Now things have changed, we
                            have no resource to complete my schooling. I am
                            looking for my virtual parent here who will take
                            care of my studies. I will prove myself and will
                            forever be grateful to person who will help me.
                          </p>
                        </div>
                        <Link
                          to="#"
                          id="videoButton"
                          onClick={toggleVideo}
                          style={{ backgroundColor: "#f1b12a" }}
                        >
                          Show Student Video
                        </Link>
                        <br />
                        <div className="student-video">
                          <video
                            id="stu-video"
                            style={{ display: "none" }}
                            width="320"
                            height="240"
                            controls
                            autoPlay
                            preload="none"
                          >
                            <source
                              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </div>
                    {/* <div style={{border:"1px solid #3d946e", padding:"7%", margin:"4% 0%"}}>
                        <div className="row"> 
                                <div className="column" style={{padding:"1% 1% 1% 0%"}}>
                                    <center>
                                    <img src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png" alt="" style={{width:"2rem"}}/>
                                    </center>
                                    <p className="text-sm mb-0" style={{textAlign:"center", fontSize:"14px"}}>
                                        Name
                                    </p>
                                    <br/>
                                    <br/>
                                    <center>
                                    <Link to="#" className="button button-primary button-wide-mobile button-sm" onClick="" style={{backgroundColor:"#3d946e"}}>Call</Link>
                                    </center>
                                </div>
                                <div className="column" style={{padding:"1%"}}>
                                    <p className="text-sm mb-0" style={{textAlign:"left", fontSize:"14px"}}>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu fugiat.
                                    </p>
                                </div>
                        </div>
                    </div> */}
                  </p>
                </div>
                <div
                  className="split-item-image center-content-mobile reveal-from-bottom"
                  data-reveal-container=".split-item"
                  style={{ paddingLeft: "2%" }}
                >
                  <p className="m-0">
                    <center>
                      <a
                        href="/"
                        className="button button-primary button-wide-mobile button-sm"
                        style={{
                          backgroundColor: "#f1b12a",
                          margin: "1%",
                          borderRadius: "20px",
                        }}
                      >
                        Schedule a Meeting
                      </a>
                      <br />
                      <a
                        href="/"
                        className="button button-primary button-wide-mobile button-sm"
                        style={{
                          backgroundColor: "#f1b12a",
                          margin: "1%",
                          borderRadius: "20px",
                        }}
                      >
                        Go Ahead
                      </a>
                      {/*<a href="#" style={{color:"grey", fontSize:"14px", margin:"0.5rem"}}>Schedule a Meeting</a>
                        <div style={{border:"1px solid #f1b12a", padding:"9%", margin:"4% 0%", width:"80%", borderRadius:"20px", boxShadow: "5px 5px #f1f1f1"}}>
                            <Calendar/>
                            <br/><br/>
                            <TimePicker />
                            <br/><br/>
                            <a href="#" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#f1b12a", margin:"1%", borderRadius:"20px"}}>Meet Now</a>
                            <a href="/Terms" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#f1b12a", margin:"1%", borderRadius:"20px"}}>Go Ahead</a>
                        </div>*/}
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
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
