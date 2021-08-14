import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";

import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link, Redirect } from "react-router-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

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

  //console.log(props.location)

  const [redirectpath, setRedirectPath] = useState("/Dashboard1_Donor");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //const [donortoken,setDonorToken]=useState('')
  const [redirect, setRedirect] = useState(false);

  const stateredirect = () => {
    try {
      var x = props.location.state.redirect;
      return x;
    } catch {
      return "undefined";
    }
  };

  const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
    let date = new Date();
    date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
  }

  const [state, setState] = useState(stateredirect());

  const handleuser = (e) => {
    setUserName(e.target.value);
  };
  const handlepassword = (e) => {
    setPassword(e.target.value);
  };
  const handlelogin = (e) => {
    e.preventDefault();
    //console.log(userName)
    //console.log(password)

    axios
      .get("/donorLogin", {
        headers: {
          email: userName,
          password: password,
          redirect: state,
        },
        withCredentials: true,
      })
      .then((response) => {
        //console.log('success')
        //console.log(response)
        if (response.data.status) {
          createCookieInHour('email', response.data.email, 120)
          if (response.data.redirect != "undefined") {
            setRedirectPath(response.data.redirect);
          }
          setRedirect(true);
        } else {
          alert(response.data.messege);
        }
      });
  };
  if (redirect) {
    return (
      <Redirect to={{ pathname: redirectpath, state: { redirected: true } }} />
    );
  } else {
    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content">
              <h2>Login As a Donor</h2>
            </SectionHeader>
            <div className={splitClasses}>
              <div className="split-item">
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                >
                  {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                  <p className="m-0">
                    <form onSubmit={handlelogin}>
                      <Input
                        onChange={handleuser}
                        id="newsletter"
                        type="email"
                        value={userName}
                        hasIcon="right"
                        placeholder="Your Username"
                        name="username"
                        style={{
                          marginTop: "4%",
                          borderRadius: "20px",
                          borderColor: "grey",
                        }}
                      ></Input>
                      <Input
                        onChange={handlepassword}
                        id="newsletter"
                        type="password"
                        value={password}
                        hasIcon="right"
                        placeholder="Your Password"
                        name="password"
                        style={{
                          marginTop: "4%",
                          borderRadius: "20px",
                          borderColor: "grey",
                        }}
                      ></Input>
                      <a
                        href="/ForgetPass"
                        style={{ color: "black", fontSize: "11px" }}
                      >
                        Forgot Your Password
                      </a>

                      <center>
                        <br />
                        {/*<div className="row">
                        <div className="columnl">
                          <Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #f1b12a", color: "#f1b12a", width: "95%" }}>Google</Link>
                        </div>
                        <div className="columnl">
                          <Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #f1b12a", color: "#f1b12a", width: "95%" }}>Instagram</Link>
                        </div>
                        <div className="columnl">
                          <Link to="/Login_Student" className="button button-primary button-wide-mobile button-sm" onClick="" style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #f1b12a", color: "#f1b12a", width: "95%" }}>Facebook</Link>
              </div>
                      </div>*/}
                      </center>
                      <br />
                      <center>
                        <button
                          type="submit"
                          className="button button-primary button-wide-mobile button-sm"
                          style={{
                            backgroundColor: "#3a936c",
                            borderRadius: "20px",
                          }}
                        >
                          Login
                        </button>
                        <br />
                        <br />
                        Don't Have an Account?{" "}
                        <a href="/Signup_Donor">Signup</a>
                      </center>
                    </form>
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-from-bottom",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                >
                  <Image
                    src={require("./../../assets/images/eDOPT.png")}
                    alt="Features split 01"
                    width={528}
                    height={396}
                  />
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
