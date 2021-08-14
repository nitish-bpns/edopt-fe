import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import Modal from "../elements/Modal";
import ImageMapper from "react-image-mapper";
import Carousel from "react-multi-carousel";
import SectionHeader from "./partials/SectionHeader";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import "./style.css";
import i18n from "i18next";
import photo from "./../../assets/images/ss2.png";
import { useTranslation, initReactI18next } from "react-i18next";
import axios from "../../api/axios";


const URL = "./../../assets/images/ss2.png";

const MAP = {
  name: "my-map",
  areas: [{ name: "1", shape: "rect", coords: [59, 319, 371, 406] }],
};

/*console.log(x);
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      English: {
        translation: {},
      },
      Hindi: {
        translation: {},
      },
    },
    lng: x,
    fallbackLng: "English",

    interpolation: {
      escapeValue: false,
    },
  });*/

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const responsiveNews = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
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
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",


  );

  //const { t } = useTranslation();

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "",
    paragraph: "",
  };
  const [loaded, setloaded] = useState(false);
  const [students, setStudents] = useState({});
  useEffect(() => {
    axios.get("/featured").then((res) => {
      setStudents(res.data);
      setloaded(true);
      console.log(res.data);
    });
  }, []);

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const photo = (key) => {
    try {
      let x = students[key].photo.data.data;
      var base64Flag = "data:image/jpeg;base64,";
      var imageStr = arrayBufferToBase64(x);
      return base64Flag + imageStr;
    } catch (error) {
      return "";
    }
  };

  return (
    <section {...props} className={outerClasses} className="bodyColor"

    >
      <div className="container" >
        {/* <img src={require('./../../assets/images/ss2.png')} alt="" usemap="#image-map"/>
        <map name="image-map">
            <area target="_self" alt="Signin Button" title="Signin Button" href="/Signup_Donor" coords="59,319,371,406" shape="rect"/>
        </map> */}
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="container-xs" styles={{
                  backgroundColor: "rgba(0, 151, 19, 0.3)",
                  boxShadow: "inset 0px 30px 30px -30px #000000",

                }}>
                  <div
                    style={{
                      textAlign: "left",
                      marginTop: "2%",
                      marginLeft: "1%",
                      marginBottom: "5%",

                    }}
                  >
                    <p
                      style={{
                        // fontFamily: "mitr",
                        color: "#3a936c",
                        fontSize: "50px",
                      }}
                    >Be a hero!</p>
                    <p
                      style={{
                        // fontFamily: "mitr",
                        color: "Black",
                        fontSize: "20px",
                        fontWeight: "inherit"
                      }}>
                      Empowering Life one at a time, Virtually edopt one mertitious students who lack means.
                    </p>
                  </div>
                  <left>
                    <div className="reveal-from-bottom" data-reveal-delay="600">
                      <ButtonGroup>

                        <Button
                          tag="a"
                          color="primary"
                          wideMobile
                          href="/Signup_Donor"
                          style={{
                            backgroundColor: "#3a936c",
                            borderRadius: "5px",

                          }}
                        >
                          edopt now!
                        </Button>
                      </ButtonGroup>
                    </div>
                  </left>
                </div>
              </div>


              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src="ss1.png" alt="" style={{ width: "88%" }} />
              </div>
            </div>
          </div>
        </div>
        {/* <br className="remove-in-mobile" />
        <br className="remove-in-mobile" /> */}
        {/* <img src={require("./../../assets/images/ss.png")} alt="" /> */}
        {/* <br />*/
          <div>
            <Carousel responsive={responsive}>
              <div className="stdCard">
                <center>
                  <Card style={{
                    padding: "4px",
                    borderRadius: "15px",
                    border: "5px",
                    margin: "10px",
                    borderTopRightRadius: "15px",
                    boxShadow: "0px 0px 20px #617264",
                  }}>
                    <CardHeader style={{
                      padding: "20px 20px 20px", margin: "0%"
                    }}>
                      <img
                        className="feature-img"
                        src="sakshi.jpg"
                        alt=""
                      />
                    </CardHeader>
                    <CardBody
                      style={{
                        textAlign: "left",
                        fontSize: "15px",

                        margin: "0%",
                        height: "230px",
                        color: "rgba(0, 0, 0, 0.7)",
                        paddingLeft: "40px",
                      }}
                    >
                      <b style={{ fontSize: "18px" }}>Sakshi</b>
                      <br />
                      Location: Delhi<br />
                      Age: 6 years<br />
                      Teacher
                      <br className="remove-in-mobile" />
                      <br className="remove-in-mobile" />
                      <center>
                        <Button
                          tag="a"
                          color="primary"
                          wideMobile
                          href="/sakshi"
                          style={{ backgroundColor: "#4b5c6b", marginTop: "18px", borderRadius: "5px" }}
                        >
                          Profile of Sakshi
                        </Button>
                      </center>
                    </CardBody>
                  </Card>
                </center>
              </div>
              <div className="stdCard">
                <center>
                  <Card style={{
                    padding: "4px",
                    borderRadius: "15px",
                    border: "none",
                    margin: "10px",
                    boxShadow: "0px 0px 20px #617264",
                  }}>
                    <CardHeader style={{
                      padding: "20px 20px 20px", marginTop: "0%"
                    }}>
                      <img
                        className="feature-img"
                        src="jatin.jpg"
                        alt=""
                      />
                    </CardHeader>
                    <CardBody
                      style={{
                        textAlign: "left",
                        fontSize: "15px",

                        margin: "0%",
                        height: "230px",
                        color: "rgba(0, 0, 0, 0.7)",
                        paddingLeft: "40px",
                      }}
                    >
                      <b style={{ fontSize: "18px" }}>Jatin</b>
                      <br />
                      Location: Karnal<br />
                      Age: 15 years<br />
                      Dancer
                      <br className="remove-in-mobile" />
                      <br className="remove-in-mobile" />
                      <center>
                        <Button
                          tag="a"
                          color="primary"
                          wideMobile
                          href="/jatin"
                          style={{ backgroundColor: "#4b5c6b", marginTop: "18px", borderRadius: "5px" }}
                        >
                          Profile of Jatin
                        </Button>
                      </center>
                    </CardBody>
                  </Card>
                </center>
              </div>
              <div className="stdCard">
                <center>
                  <Card style={{
                    padding: "4px",
                    borderRadius: "15px",
                    border: "5px",
                    margin: "10px",
                    borderTopRightRadius: "15px",
                    boxShadow: "0px 0px 20px #617264",
                  }}>
                    <CardHeader style={{
                      padding: "20px 20px 20px", margin: "0%"
                    }}>
                      <img
                        className="feature-img"
                        src="diya.jpg"
                        alt=""
                      />
                    </CardHeader>
                    <CardBody
                      style={{
                        textAlign: "left",
                        fontSize: "15px",

                        margin: "0%",
                        height: "230px",

                        paddingLeft: "40px",
                        color: "rgba(0, 0, 0, 0.7)"
                      }}
                    >
                      <b style={{ fontSize: "18px" }}>Diya</b>
                      <br />
                      Location: Sonipat<br />
                      Age: 15 years<br />
                      Dancer
                      <br className="remove-in-mobile" />
                      <br className="remove-in-mobile" />
                      <center>
                        <Button
                          tag="a"
                          color="primary"
                          wideMobile
                          href="/diya"
                          style={{ backgroundColor: "#4b5c6b", marginTop: "18px", borderRadius: "5px" }}
                        >
                          Profile of Diya
                        </Button>
                      </center>
                    </CardBody>
                  </Card>
                </center>
              </div>
            </Carousel>
            <center>
              <Button
                tag="a"
                color="primary"
                wideMobile
                href="/myfeeds"
                style={{
                  backgroundColor: "#3a936c",
                  borderRadius: "5px"
                }}
              >

                Check All
              </Button>
            </center>
            <br />
            <br />
            <br />
            {/* <button href="/myfeeds"
                className="button button-primary button-wide-mobile button-sm"

                style={{
                  backgroundColor: "#3a936c",
                  borderRadius: "5px",
                }} > */}
            <center>
              <Card style={{ padding: "4px", border: "None", width: "100%", borderRadius: "15px" }} >

                {/* <CardBody
                  // style={{

                  //   // boxShadow: "0px 0px 5px #617264",
                  //   // backgroundColor: "",
                  //   // margin: "0%",
                  //   // height: "650px",
                  //   // borderRadius: "15px",

                  // }}
                  className="videoCard"
                > */}
                <br />
                <b style={{ textAlign: "Center", fontSize: "30px" }}>What we do?</b>
                <br />

                <regular> <div style={{ textAlign: "center", fontSize: "20px" }}>We find meritious students who lack means and sponsor "one to one" in a transparent manner.</div></regular>
                <br />
                <center>



                  <div className="whatwedo-video">
                    <video
                      id="whatwedo-video"
                      style={{ marginTop: "0px", marginRight: "0px", marginLeft: "10px" }}

                      width="100%"
                      controls
                      preload="none"
                    >
                      <source
                        src={require("./../../assets/images/whatwedo.mp4")}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </center>

                {/* </CardBody> */}
              </Card>
            </center>

            <br />
            <br />
            <div className="rowIcon">
              <div className="columnIcon">
                <center>
                  <img src="money.png" style={{ width: "100%" }} />Money
                </center>
              </div>
              <div className="columnIcon">
                <center>
                  <img src="videocall.png" style={{ width: "100%" }} />Video Call
                </center>
              </div>
              <div className="columnIcon">
                <center>
                  <img src="certi.jpg" style={{ width: "100%" }} />Certificate
                </center>
              </div>
              <div className="columnIcon">
                <center>
                  <img src="pay.png" style={{ width: "100%" }} />Payment to Institution
                </center>
              </div>
            </div>
            <div className="rowIcon">
              <div className="columnIcon">
                <center>
                  <img src="report.png" style={{ width: "100%" }} />
                  Reports
                </center>
              </div>
              <div className="columnIcon">
                <center>
                  <img src="events.png" style={{ width: "100%" }} />
                  Events
                </center>
              </div>
              <div className="columnIcon">
                <center>
                  <img src="greet.png" style={{ width: "100%" }} />
                  Meet and Greet
                </center>
              </div>
              <div className="columnIcon">
                <center>
                  <img src="recent.png" style={{ width: "100%" }} />
                  Recent
                </center>
              </div>
            </div>

            {/* <div>
              <card>
                <row style={{ width: "100%", height: "100px" }}>
                  <column>
                    <card style={{ width: "10px", height: "10px" }}>
                      <img src="money.png" />10k-100k/year
                    </card>
                  </column>
                  <column>
                    <card style={{ width: "10px", height: "10px" }}>
                      <img src="videocall.png" />
                      Video Call</card>
                  </column>
                  <column>
                    <card style={{ width: "10px", height: "10px" }}>
                      <img src="certi.jpg" />

                      abc1</card>
                  </column>
                  <column>
                    <card style={{ width: "10px", height: "10px" }}>
                      <img src="Pay.png" />
                      Payment to institution</card>
                  </column>
                </row>
              </card>
              <br />
              <br />
              <br />
              <row style={{ width: "100%", height: "100px" }}>
                <column>
                  <card style={{ margin: "80px", width: "250px", height: "100px" }}>
                    <img src="report.png" />10k-100k/year
                  </card>
                </column>
                <column>
                  <card style={{ margin: "80px", width: "250px", height: "100px" }}>
                    <img src="events.png" />
                    Video Call</card>
                </column>
                <column>
                  <card style={{ margin: "80px", width: "250px", height: "100px" }}>
                    <img src="greet.png" />

                    abc1</card>
                </column>
                <column>
                  <card style={{ margin: "80px", width: "250px", height: "100px" }}>
                    <img src="recent.png" />
                    abc1</card>
                </column>
              </row>
            </div> */}
            <br />
            <br />
            <br />
            <div style={{ textAlign: "Center", fontSize: "30px", color: "black" }}>
              <b >In the NEWS!</b>
            </div>
            <br />



            <Carousel responsive={responsiveNews} style={{ width: "100%" }}>

              <img src="news01.png" />
              <img src="news02.png" />


            </Carousel>
            <br />
          </div>

            /* <br className="remove-in-mobile" />
            <center>
              <ButtonGroup>
                <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  href="/Signup_Student"
                  style={{ backgroundColor: "#3a936c", borderRadius: "5px" }}
                >
                  Start a Fundraiser
                </Button>
              </ButtonGroup>
            </center>
            <br />

            <br className="remove-in-mobile" />
            <br className="remove-in-mobile" />
            <div className={innerClasses}>
              <SectionHeader data={sectionHeader} className="center-content" />
              <div className={splitClasses}>
                <div className="split-item">
                  <div
                    className={classNames(
                      "split-item-image center-content-mobile reveal-from-bottom",
                      imageFill && "split-item-image-fill"
                    )}

                    data-reveal-container=".split-item"
                  >
                    <img src="s2.png" alt="" style={{ width: "88%" }} />
                  </div>
                  <div
                    className="split-item-content center-content-mobile reveal-from-left"
                    data-reveal-container=".split-item"
                  >
                    <div className="container-xs">
                      <div
                        className="row"
                        style={{
                          textAlign: "left",
                          marginTop: "2%",
                          marginLeft: "1%",
                          marginBottom: "5%",
                        }}
                      >
                        <div
                          className="column"
                          style={{ fontSize: "14px", paddingRight: "3%" }}
                        >
                          <p className="m-0">
                            "If we want to reach real peace in this world, we should
                            start educating children"
                            <br />~ Mahatma Gandhi
                          </p>
                        </div>
                        <div
                          className="column"
                          style={{
                            fontSize: "14px",
                            paddingLeft: "3%",
                            borderLeft: "1px solid #adb9c5",
                            textAlign: "center",
                          }}
                        >
                          <center>
                            <h4 style={{ color: "black" }}>35+</h4>
                            <p className="m-0">
                              Children have registered themselves and cleared
                              adoptation interview to change their lives forever...
                            </p>
                          </center>
                        </div>
                      </div>
                      {/* <div className="reveal-from-bottom" data-reveal-delay="600">
                    <ButtonGroup >
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        href="/Signup_Donor"
                        style={{ backgroundColor: "#3a936c", borderRadius:"5px"}}
                      >
                        Download App
                      </Button>
                    </ButtonGroup>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <br className="remove-in-mobile" />
        <br className="remove-in-mobile" />
        <br className="remove-in-mobile" />
        {/*<img src={require("./../../assets/images/ss1.png")} alt="" />
        <br />
                <br className= "remove-in-mobile" />*/}

        {/* steps video start */}
        {/* <img
          src={require("./../../assets/images/steps.png")}
          alt=""
          style={{ width: "73%" }}
        />
        <div className="mobile-video">
          <div className="steps-text">
            <img
              className="step-img"
              src={require("./../../assets/images/steps-text.png")}
              alt=""
            />
          </div>
          <div className="steps-video">
            <div className="mobile-body">
              <div className="mobile-header">
                <div className="header-camera"> </div>
                <div className="header-div"> </div>
              </div>
              <div className="mobile-screen">
                <video
                  id="how-it-works-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  dynamic-slide-video
                  status
                >
                  <source
                    src={require("./../../assets/images/videoEdopt.mp4")}
                    type="video/mp4"
                  />
                  <p>
                    Your user agent does not support the HTML5 Video element.
                  </p>
                </video>
              </div>
              <div className="mobile-footer"></div>
            </div>
          </div>
        </div>
        {/* steps video end */}
        {/*
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item celebrity">
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src="s3.png" alt="" style={{ width: "88%" }} />
              </div>
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="container-xs">
                  <div
                    className="row"
                    style={{
                      textAlign: "left",
                      marginTop: "2%",
                      marginLeft: "1%",
                      marginBottom: "5%",
                    }}
                  >
                    <div
                      className="column"
                      style={{ fontSize: "14px", paddingRight: "3%" }}
                    >
                      <p className="m-0">
                        "It is the easiest way to feel satisfactory about how
                        your money is well used for some good. I thank eDOPT
                        community for this platform"
                      </p>
                    </div>
                    <div
                      className="column"
                      style={{
                        fontSize: "14px",
                        paddingLeft: "4%",
                        borderLeft: "1px solid #adb9c5",
                        textAlign: "center",
                      }}
                    >
                      <center>
                        <h4 style={{ color: "black" }}>92%</h4>
                        <p className="m-0">Successful edoptation rate</p>
                      </center>
                    </div>
                  </div>
                  {/* <div className="reveal-from-bottom" data-reveal-delay="600">
                    <ButtonGroup >
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        href="/Signup_Donor"
                        style={{ backgroundColor: "#3a936c", borderRadius:"5px"}}
                      >
                        Download App
                      </Button>
                    </ButtonGroup>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <br className="remove-in-mobile" />
        <br className="remove-in-mobile" />
        {/*<center>
          <ButtonGroup>
            <Button
              tag="a"
              color="primary"
              wideMobile
              href="/Signup_Donor"
              style={{ backgroundColor: "#3a936c", borderRadius: "5px" }}
            >
              Edopt a child
            </Button>
            <Button
              tag="a"
              color="primary"
              wideMobile
              href="/Signup_Donor"
              style={{ backgroundColor: "#3a936c", borderRadius: "5px" }}
            >
              Know the edoptation process
            </Button>
            <Button
              tag="a"
              color="primary"
              wideMobile
              href="/Signup_Donor"
              style={{ backgroundColor: "#3a936c", borderRadius: "5px" }}
            >
              Reach out to us for edoptation
            </Button>
          </ButtonGroup>
        </center>*/}

        {/* <br className="remove-in-mobile" />
        <img src="s5.png" alt="" style={{ width: "40%" }} />
        <br />
        <br className="remove-in-mobile" />
        <Carousel responsive={responsive} style={{ alignItems: "center" }}>
          <Card style={{ marginRight: "0.4%", border: "none" }}>
            <CardHeader style={{ padding: "0px 0 5px 0", margin: "1%" }}>
              <img
                className="feature-img"
                src={loaded ? photo("st1") : ""}
                alt=""
              />
            </CardHeader>
            <CardBody
              style={{
                textAlign: "left",
                fontSize: "15px",
                backgroundColor: "#fbe192",
                margin: "1%",
                height: "265px",
              }}
            >
              <b style={{ fontSize: "18px" }}>She is Topper of her School!</b>
              <br />
              She is Neha Doddi, support her to continue her 12th standard
              studies which she is lacking due to financial crisis.
              <br />
              <br className="remove-in-mobile" />
              <center>
                <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  href={loaded ? "/Profile1/" + students.st1._id : ""}
                  style={{ backgroundColor: "#4b5c6b", borderRadius: "5px" }}
                >
                  eDOPT {loaded ? students.st1.name : ""}
                </Button>
              </center>
            </CardBody>
          </Card>
          <Card
            style={{ marginLeft: "0.4%", marginRight: "0.4%", border: "none" }}
          >
            <CardHeader style={{ padding: "0px 0 5px 0", margin: "1%" }}>
              <img
                className="feature-img"
                src={loaded ? photo("st2") : ""}
                alt=""
              />
            </CardHeader>
            <CardBody
              style={{
                textAlign: "left",
                fontSize: "15px",
                backgroundColor: "#fbe192",
                margin: "1%",
                height: "265px",
              }}
            >
              <b style={{ fontSize: "18px" }}>Meenu has to quit her dream.</b>
              <br />
              She is bright and intuitive girl who have to quit her dream of
              becoming a doctor due to her family problems. Help her to persue
              her passion and live her dream.
              <br />
              <br className="remove-in-mobile" />
              <center>
                <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  href={loaded ? "/Profile1/" + students.st2._id : ""}
                  style={{ backgroundColor: "#4b5c6b", borderRadius: "5px" }}
                >
                  eDOPT {loaded ? students.st2.name : ""}
                </Button>
              </center>
            </CardBody>
          </Card>
          <Card style={{ marginLeft: "0.4%", border: "none" }}>
            <CardHeader style={{ padding: "0px 0 5px 0", margin: "1%" }}>
              <img
                className="feature-img"
                src={loaded ? photo("st3") : ""}
                alt=""
              />
            </CardHeader>
            <CardBody
              style={{
                textAlign: "left",
                fontSize: "15px",
                backgroundColor: "#fbe192",
                margin: "1%",
                height: "265px",
              }}
            >
              <b style={{ fontSize: "18px" }}>Help Him to Reach His Goal</b>
              <br />
              He is a brilliant student and want to pursue business. Support and
              help him in completing his studies.
              <br />
              <br className="remove-in-mobile" />
              <center>
                <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  href={loaded ? "/Profile1/" + students.st3._id : ""}
                  style={{ backgroundColor: "#4b5c6b", borderRadius: "5px" }}
                >
                  eDOPT {loaded ? students.st3.name : ""}
                </Button>
              </center>
            </CardBody>
          </Card>
        </Carousel>
        <br />
        <br className="remove-in-mobile" />
        <br className="remove-in-mobile" /> */}
        {/*}
        <img src="s4.png" alt="" style={{ width: "50%" }} />
        <br />
        <br className= "remove-in-mobile" />
        <Carousel responsive={responsive} style={{ alignItems: "center" }}>
          <div className="row" style={{ textAlign: "left", color: "black" }}>
            <div className="columnr">
              <img
                src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"
                alt=""
                style={{ width: "2rem", textAlign: "left" }}
              />
            </div>
            <div className="columnq">
              Amit Kumar
              <br />
              Bhopal
            </div>
          </div>
          <div className="row" style={{ textAlign: "left", color: "black" }}>
            <div className="columnr">
              <img
                src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"
                alt=""
                style={{ width: "2rem", textAlign: "left" }}
              />
            </div>
            <div className="columnq">
              Amit Kumar
              <br />
              Bhopal
            </div>
          </div>
          <div className="row" style={{ textAlign: "left", color: "black" }}>
            <div className="columnr">
              <img
                src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"
                alt=""
                style={{ width: "2rem", textAlign: "left" }}
              />
            </div>
            <div className="columnq">
              Amit Kumar
              <br />
              Bhopal
            </div>
          </div>
        </Carousel>
        <br />
        <br className= "remove-in-mobile" />
        <br className= "remove-in-mobile" />
            
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item" style={{ backgroundColor: "#f7f9fa" }}>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src="s1.png" alt="" style={{ width: "88%" }} />
              </div>
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="container-xs">
                  <div
                    style={{
                      textAlign: "left",
                      marginTop: "2%",
                      marginLeft: "1%",
                      marginBottom: "5%",
                    }}
                  >
                    <p className="m-0" style={{ fontSize: "14px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua — Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                  <div className="reveal-from-bottom" data-reveal-delay="600">
                    <ButtonGroup>
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        href="/Signup_Donor"
                        style={{
                          backgroundColor: "#3a936c",
                          borderRadius: "5px",
                        }}
                      >
                        Download App
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br className="remove-in-mobile" />
        <br className="remove-in-mobile" />
        
        <center>
          <h4 style={{ color: "black" }}>Featured In</h4>
        </center>
        <Carousel responsive={responsive} style={{ alignItems: "center" }}>
          <div>
            <center>
              <Image
                src={require("./../../assets/images/c4.png")}
                alt="Features split 03"
              />
            </center>
          </div>
          <div>
            <center>
              <Image
                src={require("./../../assets/images/c1.jpg")}
                alt="Features split 03"
              />
            </center>
          </div>
          <div>
            <center>
              <Image
                src={require("./../../assets/images/c4.png")}
                alt="Features split 03"
              />
            </center>
          </div>
          <div>
            <center>
              <Image
                src={require("./../../assets/images/c6.jpg")}
                alt="Features split 03"
              />
            </center>
          </div>
        </Carousel>
        <br /> 
        <br className="remove-in-mobile" />
        <b style={{ color: "black" }}>
          Have a question? chat with us on Whatsapp
        </b>
        <Button
          tag="a"
          color="primary"
          wideMobile
          href="/Signup_Donor"
          style={{
            backgroundColor: "#0c8645",
            borderRadius: "25px",
            marginLeft: "2%",
          }}
        >
          Chat With Us
        </Button>
        <br />
        <br />
        <br />*/}
      </div >
    </section >

  );

};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
