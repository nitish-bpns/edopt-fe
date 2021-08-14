import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
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

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmp, setConfirmp] = useState("");



  //function to validate email
  const [is_valid, setIs_valid] = useState(true);
  const ValidateEmail = (e) => {
    setEmail(e.target.value);
    var input = e.target.value;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      //console.log("Valid email address!");
      //document.form1.text1.focus();
      setIs_valid(true);
    } else {
      //console.log("Invalid email address!");
      //document.form1.text1.focus();
      setIs_valid(false);
    }
  };

  const [pis_valid, setPis_valid] = useState(true);
  const passwordvalidate = (e) => {
    setConfirmp(e.target.value);
    if (password == e.target.value) {
      setPis_valid(true);
    } else {
      setPis_valid(false);
    }
  };



  const [redirectlogin, setRedirectlogin] = useState(false);
  const sighnuphandler = (e) => {
    e.preventDefault();
    if (is_valid && pis_valid) {
      if (
        name &&
        city &&
        pin &&
        age &&
        address &&
        gender &&
        address &&
        phone &&
        email &&
        password
      ) {
        axios
          .post("/registerDonor", {
            body: {
              name: name,
              age: age,
              gender: gender,
              city: city,
              pin: pin,
              address: address,
              phone: phone,
              email: email,
              password: password,
            },
          })
          .then((response) => {
            //console.log(response)
            if (response.data.status) {
              alert(response.data.messege);
              setRedirectlogin(true);
            } else {
              alert(response.data.messege);
            }
          });
      } else {
        alert("please fill all the fields");
      }
    } else {
      alert("check password and email fields");
    }
  };

  if (redirectlogin) {
    return <Redirect to={{ pathname: "/Login_Donor", state: {} }} />;
  } else {


    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content">
              <h2>Signup As a Donor</h2>
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
                    <form action="/data.php" method="get">
                      <Input
                        onKeyPress="return /[a-z]/i.test(event.key)"
                        id="newsletter"
                        type="text"
                        hasIcon="right"
                        placeholder="Your Name"


                        name="name"
                        style={{
                          marginTop: "4%",
                          borderRadius: "20px",
                          borderColor: "grey",
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        value={name}
                      ></Input>
                      {/* <div className="row" style={{marginTop:"2%"}}>
                    <div className="column" style={{paddingRight:"1%"}}>
                    <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Age" name="age" style={{marginTop:"4%", borderRadius:"20px", borderColor:"grey"}}>  
                    </Input>
                    </div>
                    <div className="column" style={{paddingLeft:"1%"}}>
                    <Input id="newsletter" type="gender" hasIcon="right" placeholder="Your Gender" name="gender" style={{marginTop:"4%", borderRadius:"20px", borderColor:"grey"}}>  
                    </Input>
                    </div>
                  </div> */}
                      <div className="row" style={{ marginTop: "2%" }}>
                        <div className="column" style={{ paddingRight: "1%" }}>
                          <Input
                            id="newsletter"
                            type="text"
                            hasIcon="right"
                            placeholder="Your City"
                            name="city"
                            style={{
                              marginTop: "4%",
                              borderRadius: "20px",
                              borderColor: "grey",
                            }}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            value={city}
                          ></Input>
                        </div>
                        <div className="column" style={{ paddingLeft: "1%" }}>
                          <Input
                            id="newsletter"
                            type="number"
                            hasIcon="right"
                            placeholder="Your Pincode"
                            name="pin"
                            style={{
                              marginTop: "4%",
                              borderRadius: "20px",
                              borderColor: "grey",
                            }}
                            onChange={(e) => {
                              setPin(e.target.value);
                            }}
                            value={pin}
                          ></Input>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "2%" }}>
                        <div className="column" style={{ paddingRight: "1%" }}>
                          <Input
                            id="newsletter"
                            type="number"
                            hasIcon="right"
                            placeholder="Your Age"
                            name="age"
                            style={{
                              marginTop: "4%",
                              borderRadius: "20px",
                              borderColor: "grey",
                            }}
                            onChange={(e) => {
                              setAge(e.target.value);
                            }}
                            value={age}
                          ></Input>
                        </div>
                        <div className="column" style={{ paddingLeft: "1%" }}>
                          <select
                            id="newsletter"
                            className="select"
                            hasIcon="right"
                            placeholder="Your Gender"
                            name="gender"
                            style={{
                              marginTop: "4%",
                              borderRadius: "20px",
                              borderColor: "grey",
                              display: "block",
                              fontSize: "16px",
                              lineHeight: "24px",
                              letterSpacing: "-0.1px",
                              padding: "11px 15px",
                              height: "48px",
                              color: "#Abadad",
                              boxShadow: "none",
                              maxWidth: "100%",
                              width: "100%",
                              backgroundColor: "#eceded",


                            }}
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                            value={gender}
                          >
                            <option style={{
                              color: "black",
                            }}>
                              Gender</option>
                            <option style={{
                              color: "black",
                            }}>Male</option>
                            <option style={{
                              color: "#151719",
                            }}>Female</option>


                          </select>
                        </div>
                      </div>
                      <Input
                        id="newsletter"
                        type="name"
                        hasIcon="right"
                        placeholder="Your Address"
                        name="address"
                        style={{
                          marginTop: "4%",
                          borderRadius: "20px",
                          borderColor: "grey",
                        }}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        value={address}
                      ></Input>
                      <Input
                        id="newsletter"
                        type="number"
                        hasIcon="right"
                        placeholder="Your Phone"
                        name="phone"
                        style={{
                          marginTop: "4%",
                          borderRadius: "20px",
                          borderColor: "grey",
                        }}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        value={phone}
                      ></Input>
                      <Input
                        id="newsletter"
                        type="email"
                        hasIcon="right"
                        placeholder="Your Email"
                        name="email"
                        style={{
                          marginTop: "4%",
                          borderRadius: "20px",
                          borderColor: "grey",
                        }}
                        onChange={ValidateEmail}
                        value={email}
                      ></Input>
                      {is_valid ? "" : <p>  Please enter valid email id</p>}
                      <div className="row" style={{ marginTop: "2%" }}>
                        <div className="column" style={{ paddingRight: "1%" }}>
                          <Input
                            id="newsletter"
                            type="password"
                            hasIcon="right"
                            placeholder="New Password"
                            name="password"
                            style={{
                              marginTop: "4%",
                              borderRadius: "20px",
                              borderColor: "grey",
                            }}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            value={password}
                          ></Input>
                        </div>
                        <div className="column" style={{ paddingRight: "1%" }}>
                          <Input
                            id="newsletter"
                            type="password"
                            hasIcon="right"
                            placeholder="confirm Password"
                            name="confirmpassword"
                            style={{
                              marginTop: "4%",
                              borderRadius: "20px",
                              borderColor: "grey",
                            }}
                            onChange={passwordvalidate}
                            value={confirmp}
                          ></Input>
                        </div>
                      </div>
                      {pis_valid ? "" : <p>passwords dont match</p>}
                      {/* <Input id="newsletter" type="name" hasIcon="right" placeholder="Your Company" name="company" style={{marginTop:"4%", borderRadius:"20px", borderColor:"grey"}}>  
                  </Input>*/}
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
                          onClick={sighnuphandler}
                          className="button button-primary button-wide-mobile button-sm"
                          style={{
                            backgroundColor: "#3a936c",
                            borderRadius: "20px",
                          }}
                        >
                          Signup
                        </button>
                        <br />
                        <br />
                        Already Have an Account?{" "}
                        <a href="/Login_Donor">Login</a>
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
