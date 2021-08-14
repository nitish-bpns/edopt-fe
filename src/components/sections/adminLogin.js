import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link, Redirect } from "react-router-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useState, useEffect, useContext } from 'react';
import axios from "../../api/axios";

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

  const [username, Setusername] = useState('')
  const [password, Setpassword] = useState('')
  const [redirecthome, setRedirectHome] = useState(false)

  const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
    let date = new Date();
    date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
  }

  const loginhandler = (e) => {
    e.preventDefault()
    axios.get('/admin/login', {
      headers: {
        'username': username,
        'password': password,

      }, withCredentials: true
    }).then((res) => {
      //console.log(res.data)
      if (res.data.status) {
        createCookieInHour('email', res.data.email, 120)
        setRedirectHome(true)
      }
      else {
        alert('password or username incorrect')
      }
    }).catch((res) => {
      alert('something went wrong contact dev!!')
    })

  }


  if (redirecthome) {
    return (<Redirect to={{ pathname: "/Admin", state: {} }} />)
  }

  else {
    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content">
              <h2>Admin Login</h2>
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
                    <form>
                      <Input
                        value={username}
                        onChange={(e) => { Setusername(e.target.value) }}
                        id="newsletter"
                        type="email"
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
                        value={password}
                        onChange={(e) => { Setpassword(e.target.value) }}
                        id="newsletter"
                        type="password"
                        hasIcon="right"
                        placeholder="Your Password"
                        name="password"
                        style={{
                          marginTop: "4%",
                          borderRadius: "20px",
                          borderColor: "grey",
                        }}
                      ></Input>
                      <br />
                      <br />
                      <center>
                        <button
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={loginhandler}
                          style={{
                            backgroundColor: "#f1b12a",
                            borderRadius: "20px",
                          }}
                        >
                          Login
                        </button>
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
  };
}
FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
