import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link } from "react-router-dom";
import "./style.css";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useState, useEffect, useContext } from "react";
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

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    const copyFormData = { ...formData };
    copyFormData[e.target.name] = e.target.value;
    setFormData(copyFormData);
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch(
        "https://v1.nocodeapi.com/eedopt/google_sheets/EJbzyRDJOnoGsbzb?tabId=Student_signup",
        {
          method: "post",
          body: JSON.stringify([
            [
              formData.name,
              formData.Age,
              formData.Class,
              formData.School,
              formData.Phone,
              formData.Location,
              formData.intro,
            ],
          ]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      console.log("Success:", JSON.stringify(json));
      setMessage("Success");
      alert("Form Submitted Successfully. Our Team will Contact you soon");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error");
    }
  };

  return (
    <section {...props} className={outerClasses}>
      <form onSubmit={sendData} id="blur">
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content">
              <h2>Contact Us</h2>
            </SectionHeader>

            <div className={splitClasses}>
              <div className="split-item">
                <div
                  className="split-item-content center-content-mobile reveal-from-left"
                  data-reveal-container=".split-item"
                >
                  <p className="m-0">
                    {/* <p className="m-0">Your Information</p> */}
                    <div className="row" style={{ marginTop: "0%" }}>
                      {/* <div className="column" style={{ paddingRight: "1%" }}>
                        <Input id="newsletter" type="name" value={studentName} onChange={(e) => { setStudentName(e.target.value) }} hasIcon="right" placeholder="Your Name"
                          name="name"
                          style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                        </Input>
                      </div> */}
                      {/* <div className="column" style={{ paddingLeft: "1%" }}>
                        <Input id="newsletter" type="name" value={studentUserName} onChange={(e) => { setStudentUserName(e.target.value) }} hasIcon="right" placeholder="Username"
                          name="name"
                          style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                        </Input>
                      </div> 
                    </div>
                    <div className="row" style={{ marginTop: "2%" }}>
                      <div className="column" style={{ paddingRight: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right"
                          placeholder="Your Age" name="age" style={{
                            marginTop: "4%",
                            borderRadius: "20px",
                            borderColor: "grey"
                          }}
                          onChange={(e) => { setStudentAge(e.target.value) }} value={studentAge}
                        >
                        </Input>
                      </div>
                      <div className="column" style={{ paddingLeft: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right"
                          placeholder="Your Gender" name="gender" style={{
                            marginTop: "4%",
                            borderRadius: "20px",
                            borderColor: "grey"
                          }}
                          onChange={(e) => { setStudentGender(e.target.value) }} value={studentGender}
                        >
                        </Input>
                      </div> 
                    </div>
                    <div className="row" style={{ marginTop: "2%" }}>
                      <div className="column" style={{ paddingRight: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right"
                          onChange={(e) => { setStudentCity(e.target.value) }} value={studentCity}
                          placeholder="Class" name="city" style={{
                            marginTop: "4%",
                            borderRadius: "20px",
                            borderColor: "grey"
                          }}>
                        </Input>
                      </div>
                       <div className="column" style={{ paddingLeft: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right"
                          onChange={(e) => { setStudentPincode(e.target.value) }} value={studentPincode}
                          placeholder="Your Pincode" name="pin" style={{
                            marginTop: "4%",
                            borderRadius: "20px",
                            borderColor: "grey"
                          }}>
                        </Input>
                      </div> */}
                    </div>

                    <Input
                      id="newsletter"
                      type="name"
                      hasIcon="right"
                      placeholder="Your Name"
                      name="name"
                      onChange={handleInput}
                      style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                      }}
                    ></Input>

                    <Input
                      id="newsletter"
                      type="name"
                      hasIcon="right"
                      placeholder="Your Age"
                      name="Age"
                      onChange={handleInput}
                      style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                      }}
                    ></Input>

                    <Input
                      id="newsletter"
                      type="name"
                      hasIcon="right"
                      placeholder="Class"
                      name="Class"
                      onChange={handleInput}
                      style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                      }}
                    ></Input>

                    <Input
                      id="newsletter"
                      type="name"
                      hasIcon="right"
                      placeholder="School Name"
                      name="School"
                      onChange={handleInput}
                      style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                      }}
                    ></Input>
                    <Input
                      id="newsletter"
                      type="tel"
                      hasIcon="right"
                      placeholder="Phone no."
                      name="Phone"
                      onChange={handleInput}
                      style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                      }}
                    ></Input>
                    <Input
                      id="newsletter"
                      type="text"
                      hasIcon="right"
                      placeholder="Location"
                      onChange={handleInput}
                      name="Location"
                      style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                      }}
                    ></Input>
                    <br />
                    <br />
                    <Input
                      id="newsletter"
                      type="name"
                      hasIcon="right"
                      onChange={handleInput}
                      placeholder="Your Story (50 Words)"
                      name="intro"
                      style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                        height: "5rem",
                      }}
                    ></Input>
                    {/* <Input id="newsletter" type="name" hasIcon="right"
                      onChange={(e) => { setStudentBody(e.target.value) }} value={studentBody}
                      placeholder="Body (150 Words)" name="body" style={{
                        marginTop: "4%",
                        borderRadius: "20px",
                        borderColor: "grey",
                        height: "7rem"
                      }}>
                    </Input> */}
                  </p>
                </div>
                {/* <div className={
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
                  <p className="m-0">*/}
                {/* <p className="m-0">Guardian's Information</p>
                    <Input id="newsletter" type="name" hasIcon="right" placeholder="Guardian's Name"
                      name="name"
                      onChange={(e) => { setGuardianName(e.target.value) }} value={guardianName}
                      style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <div className="row" style={{ marginTop: "2%" }}>
                      <div className="column" style={{ paddingRight: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right"
                          onChange={(e) => { setGuardianAge(e.target.value) }} value={guardianAge}
                          placeholder="Guardian's Age" name="age" style={{
                            marginTop: "4%",
                            borderRadius: "20px",
                            borderColor: "grey"
                          }}>
                        </Input>
                      </div>
                      <div className="column" style={{ paddingLeft: "1%" }}>
                        <Input id="newsletter" type="name" hasIcon="right"
                          onChange={(e) => { setGuardianGender(e.target.value) }} value={guardianGender}
                          placeholder="Guardian's Gender" name="gender" style={{
                            marginTop: "4%",
                            borderRadius: "20px",
                            borderColor: "grey"
                          }}>
                        </Input>
                      </div>
                    </div>
                    <Input id="newsletter" type="name" hasIcon="right"
                      placeholder="Guardian's Phone" name="phone"
                      onChange={(e) => { setGuardianPhone(e.target.value) }} value={guardianPhone}
                      style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <Input id="newsletter" type="name" hasIcon="right" placeholder="Relation"
                      name="relation"
                      onChange={(e) => { setGuardianRelation(e.target.value) }} value={guardianRelation}
                      style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <Input id="newsletter" type="name" hasIcon="right" placeholder="Address"
                      name="address"
                      onChange={(e) => { setGuardianAddress(e.target.value) }} value={guardianAddress}
                      style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input> */}

                <Image
                  src={require("./../../assets/images/eDOPT.png")}
                  alt="Features split 01"
                  width={528}
                  height={396}
                />
                {/* <br />
                    <br />
                    <Input id="newsletter" type="name" hasIcon="right"
                      onChange={(e) => { setGuardianWants(e.target.value) }} value={guardianWants}
                      placeholder="Your Wants (50 Words)" name="wants" style={{
                        marginTop: "2%",
                        borderRadius: "20px",
                        borderColor: "grey",
                        height: "5rem"
                      }}>
                    </Input>
                    <Input id="newsletter" type="name" hasIcon="right"
                      onChange={(e) => { setGuardianNeeds(e.target.value) }} value={guardianNeeds}
                      placeholder="Your Needs (150 Words)" name="needs" style={{
                        marginTop: "3%",
                        borderRadius: "20px",
                        borderColor: "grey",
                        height: "7rem"
                      }}>
                    </Input> */}
                {/* </p>
                </div> */}
              </div>
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
</center>
<br /> */}
              <center>
                <input
                  name="submit"
                  className="btn button button-primary button-wide-mobile button-sm"
                  placeholder="Contact Us"
                  style={{ backgroundColor: "#3a936c", borderRadius: "20px" }}
                  type="submit"
                  value="Send"
                />
                {/* <br /><br />Already have an account? <a href="/Login_Student">Login</a> */}
              </center>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
