import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Pagination from "rc-pagination";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import Input from "../elements/Input";
import "react-multi-carousel/lib/styles.css";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { x } from "./Hero";
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

  const sectionHeader = {
    title: "",
    paragraph: "-",
  };

  const pagefun = () => {
    try {
      var x = props.location.pathname.split("/");
      //console.log(x)
      return x[2];
    } catch {
      return 1;
    }
  };
  const [page, setpage] = useState(pagefun());

  const [studentList, setStudentList] = useState([]);
  const [citySearch, setCitySearch] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get("/donorFeed", {
        params: {
          pageNo: page,
          size: 100,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          alert(response.data.message);
        } else {
          setStudentList(response.data.message);
          setLoaded(true);
        }
      });
  }, []);

  const search = () => {
    axios
      .get("/donorFeed", {
        headers: {
          location: citySearch,
        },
        params: {
          pageNo: 1,
          size: 100,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.message);
        } else {
          setStudentList(response.data.message);
          setLoaded(true);
          //console.log(response.data)
          setCitySearch("");
        }
      });
  };

  //const {t} = useTranslation();
  const keyPressHandler = (e) => {
    if (e.which === 13) {
      search();
    }
  };

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const photo = (index) => {
    try {
      let x = studentList[index].photo.data.data;
      var base64Flag = "data:image/jpeg;base64,";
      var imageStr = arrayBufferToBase64(x);
      return base64Flag + imageStr;
    } catch (error) {
      return "";
    }
  };

  // alert("Please Use Student's Emails to Schedule a Meeing");
  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content">
            <Input
              id="newsletter"
              type="text"
              label="Subscribe"
              labelHidden
              hasIcon="right"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
              }}
              onKeyPress={keyPressHandler}
              placeholder="Search by city"
              name="news"
              style={{
                margin: "4% 0%",
                borderRadius: "20px",
                borderColor: "grey",
              }}
            >
              <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z"
                  fill="#376DF9"
                />
              </svg>
            </Input>

            <p>How we work</p>
            <p>Checkout our feeds to know more about students!</p>
          </SectionHeader>
          <div className={splitClasses}>
            {studentList.length ? (
              studentList.map((student, index) => {
                return (
                  <div className="split-item">
                    <div
                      className={classNames(
                        "split-item-image center-content-mobile ",
                        imageFill && "split-item-image-fill"
                      )}
                      data-reveal-container=".split-item"
                    >
                      <Image
                        className="feed-student"
                        src={loaded ? photo(index) : ""}
                        alt="Features split 01"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <div
                      className="split-item-content center-content-mobile "
                      data-reveal-container=".split-item"
                    >
                      {/* <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                    Lightning fast workflow
                    </div> */}
                      <h4 className="mt-0 mb-12">{student.name}</h4>
                      <p className="m-0" style={{ fontSize: "14px" }}>
                        Age : {student.age}
                      </p>
                      <p className="m-0" style={{ fontSize: "14px" }}>
                        {student.intro
                          ? student.intro
                          : "No introduction provided!"}
                      </p>
                      <center>
                        <a
                          href={"/Profile1/" + student._id}
                          className="button button-primary button-wide-mobile button-sm"
                          style={{
                            backgroundColor: "#f1b12a",
                            borderRadius: "20px",
                            marginTop: "2%",
                          }}
                        >
                          Read More
                        </a>
                      </center>
                    </div>
                    {/*<div className={
                  classNames(
                    'split-item-image center-content-mobile ',
                    imageFill && 'split-item-image-fill'
                  )}
                  data-reveal-container=".split-item">
                  <Image
                    src={loaded?photo(index):""}
                    alt="Features split 01"
                    style={{width:"60%"}} />
                </div>*/}
                  </div>
                );
              })
            ) : (
              <div className="split-item">
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                >
                  <h3 className="mt-0 mb-12">No Students yet!</h3>
                </div>
              </div>
            )}

            <button></button>

            <br />
            <br />
            <Carousel
              responsive={responsive}
              style={{ alignItems: "center", marginTop: "5%" }}
            >
              {studentList.length ? (
                studentList.map((student, index) => {
                  return (
                    <div>
                      <center>
                        <Image
                          src={loaded ? photo(index) : ""}
                          alt="Features split 03"
                          style={{ width: "50%" }}
                        />
                        <p style={{ fontSize: "14px", marginTop: "2%" }}>
                          {student.name}
                          <br />
                          Age: {student.age}
                          <br />
                          City: {student.city}
                          <br />
                        </p>
                        <a
                          href={"/Profile1/" + student._id}
                          className="button button-primary button-wide-mobile button-sm"
                          style={{
                            backgroundColor: "#f1b12a",
                            borderRadius: "20px",
                            marginTop: "2%",
                          }}
                        >
                          Read More
                        </a>
                      </center>
                    </div>
                  );
                })
              ) : (
                <div>
                  <center>Oops, No Students Yet!</center>
                </div>
              )}

              {/* <div>
                <center>
                <Image
                  src={require('./../../assets/images/p3.png')}
                  alt="Features split 03"
                  style={{width:"50%"}}
                />
                <a href="/Profile" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", borderRadius:"20px", marginTop:"2%"}}>Read More</a>
                </center>
                </div>
                <div>
                <center>
                <Image
                  src={require('./../../assets/images/p3.png')}
                  alt="Features split 03"
                  style={{width:"50%"}}
                />
                <a href="/Profile" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", borderRadius:"20px", marginTop:"2%"}}>Read More</a>
                </center>
                </div> */}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
