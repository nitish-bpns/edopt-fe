
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link, Redirect } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import axios from "../../api/axios";
import React, { useContext, useEffect, useState } from 'react';

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
    paragraph: '-'
  };


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('');
  //const [token, setToken] = useState({});
  const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
    let date = new Date();
    date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
  }
  const studentLoginHandler = (e) => {
    e.preventDefault()
    if (!username) {
      alert("please enter Username")
    }
    axios.get('/studentLogin', {
      headers: {
        'email': username,
        'password': password
      }, withCredentials: true
    }).then((response) => {
      //console.log(response.data)
      if (response.data.status) {
        createCookieInHour('email', response.data.email, 120)
        setRedirect(true)
      }
      else { alert(response.data.messege) }
    })
    //.catch((err)=>{
    //  alert('password or username incorrect')
    //})

  }
  if (redirect) {
    return (<Redirect to={{ pathname: "/Dashboard1_Student", state: {} }} />)
  }
  else {


    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content">
              <h2>Login As a Student</h2>
            </SectionHeader>
            <div className={splitClasses}>

              <div className="split-item">
                <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                  {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                  <p className="m-0">
                    <form>
                      <Input value={username} onChange={(e) => { setUsername(e.target.value) }} id="newsletter" hasIcon="right" placeholder="Your Username" name="username" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                      </Input>
                      <Input value={password} onChange={(e) => { setPassword(e.target.value) }} id="newsletter" type="password" hasIcon="right" placeholder="Your Password" name="password" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                      </Input>
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
                    </center> */}
                      <br />
                      <center>
                        <button type="submit"
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={studentLoginHandler} style={{
                            backgroundColor: "#3a936c",
                            borderRadius: "20px"
                          }}>Login</button>
                        <br /><br />Don't Have an Account? <a href="/Signup_Student">Signup</a>
                      </center>
                    </form>
                  </p>
                </div>
                <div className={
                  classNames(
                    'split-item-image center-content-mobile reveal-from-bottom',
                    imageFill && 'split-item-image-fill'
                  )}
                  data-reveal-container=".split-item">
                  <Image
                    src={require('./../../assets/images/eDOPT.png')}
                    alt="Features split 01"
                    width={528}
                    height={396} />
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