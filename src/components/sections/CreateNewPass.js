import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Input from '../elements/Input';
import { Link } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import './style.css';

function matchPassword() {
  var pw1 = document.getElementById("pswd1");
  var pw2 = document.getElementById("pswd2");
  if (pw1 != pw2) {
    document.getElementById("message").innerHTML = "**Passwords are not same";
  }
}

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

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content">
            <h2>Create New Password</h2>
          </SectionHeader>
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                {/* <h3 className="mt-0 mb-12">
                  Lorem Ipsum
                </h3> */}
                <p className="m-0">
                  <form>
                    <Input id="newsletter" type="number" hasIcon="right" placeholder="Enter OTP" name="otp" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <Input id="pswd1" type="password" hasIcon="right" placeholder="Your Password" name="password" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <Input id="pswd2" type="password" hasIcon="right" placeholder="Confirm Password" name="confirm-pass" style={{ marginTop: "4%", borderRadius: "20px", borderColor: "grey" }}>
                    </Input>
                    <span id="message" style={{ color: "red" }}> </span>
                    <br />
                    <center>
                      <Link to="/Login_Donor" className="button button-primary button-wide-mobile button-sm" onClick={matchPassword} style={{ backgroundColor: "#f1b12a", borderRadius: "20px" }}>Confirm</Link>
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

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;