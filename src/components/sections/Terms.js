import React, { useState } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Input from "../elements/Input";
import { Link } from "react-router-dom";
import Modal from "../elements/Modal";
import "./style.css";
import FooterSocial from "../layout/partials/FooterSocial";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";

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

  const getid = () => {
    const arr = props.location.pathname.split("/");
    return arr[2];
  };
  const [studentid, setStudentId] = useState(getid());
  // alert("Login to Schedule a Meeting!")
  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <center>
            <h2>Acceptance of the Terms of Use</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              These terms of use (“Terms of Use”) are entered into by and
              between you (“you”) and Edopt Private Limited (“Company”), the
              owner of the website www.edopt.org (the “Website”). It governs
              your access to and use of every content, functionality or services
              offered on or through the Website.
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              These Terms of Use apply to you even if you are a guest and not a
              registered user of the Website. Please therefore read these Terms
              of Use carefully before using the Website. By using the Website or
              by clicking to accept or agree to the Terms of Use, you accept and
              agree to be bound and abide by these Terms of Use and our Privacy
              Policy, found at [PRIVACY POLICY URL], incorporated herein by
              reference. If you do not agree to these Terms of Use or the
              Privacy Policy, you must not access or use the Website.
            </p>
            <h2>Accessing the Website and Account Security</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              We reserve the right to withdraw or amend this Website and any
              service or material we provide on the Website in our sole
              discretion without notice. We will not be liable if for any reason
              all or any part of the Website is unavailable at any time or for
              any period. From time to time, we may restrict access to some
              parts of the Website, or the entire Website, to users, including
              registered users.
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              To access the Website or some of the resources it offers, you may
              be asked to provide certain registration details or other
              information. It is a condition of your use of the Website that all
              the information you provide on the Website is correct, current,
              and complete. You agree that all information you provide to
              register with this Website or otherwise, including, but not
              limited to, through the use of any interactive features on the
              Website, or any agreement entered into digitally, is governed by
              our Privacy Policy [LINK TO PRIVACY POLICY], and you consent to
              all actions we take with respect to your information consistent
              with our Privacy Policy.
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              If you choose, or are provided with, a username, password, or any
              other piece of information as part of our security procedures, you
              must treat such information as confidential, and you must not
              disclose it to any other person or entity. You also acknowledge
              that your account is personal to you and agree not to provide any
              other person with access to this Website or portions of it using
              your username, password, or other security information. You agree
              to notify us immediately of any unauthorized access to or use of
              your username or password or any other breach of security. You
              also agree to ensure that you exit from your account at the end of
              each session. You should use particular caution when accessing
              your account from a public or shared computer so that others are
              not able to view or record your password or other personal
              information.
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              We have the right to disable any user name, password, or other
              identifier, whether chosen by you or provided by us, at any time
              in our sole discretion for any or no reason, including if, in our
              opinion, you have violated any provision of these Terms of Use.
            </p>
            <h2>Trademarks</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              The Company’s name, logo, and all related names, logos, product
              and service names, designs, and slogans are trademarks of the
              Company or its affiliates or licensors. You must not use such
              marks without the prior written permission of the Company. All
              other names, logos, product and service names, designs, and
              slogans on this Website are the trademarks of their respective
              owners.
            </p>

            <h2> Prohibited Uses</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              You may use the Website only for lawful purposes and in accordance
              with these Terms of Use and any agreement that you have entered
              into with the Company. You agree not to use the Website:
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              1. In any way that violates any applicable federal, state, local,
              or international law or regulation (including, without limitation,
              any laws regarding the export of data or software to and from
              India or other countries);
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              2. For the purpose of exploiting, harming, or attempting to
              exploit or harm minors in any way by exposing them to
              inappropriate content, asking for personally identifiable
              information, or otherwise;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              3. To transmit, or procure the sending of, any advertising or
              promotional material, including any “junk mail,” “chain letter,”
              “spam,” or any other similar solicitation;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              4. To impersonate or attempt to impersonate the Company, a Company
              employee, another user, or any other person or entity (including,
              without limitation, by using email addresses associated with any
              of the foregoing);
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              5. To engage in any other conduct that restricts or inhibits
              anyone’s use or enjoyment of the Website, or which, as determined
              by us, may harm the Company or users of the Website, or expose
              them to liability.
            </p>
            <br />
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              Additionally, you agree not to:
            </p>
            <br />

            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              1. Use the Website in any manner that could disable, overburden,
              damage, or impair the site or interfere with any other party’s use
              of the Website, including their ability to engage in real time
              activities through the Website;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              2. Use any robot, spider, or other automatic device, process, or
              means to access the Website for any purpose, including monitoring
              or copying any of the material on the Website;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              3. Use any manual process to monitor or copy any of the material
              on the Website, or for any other purpose not expressly authorized
              in these Terms of Use, without our prior written consent;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              4. Use any device, software, or routine that interferes with the
              proper working of the Website;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              5. Introduce any viruses, Trojan horses, worms, logic bombs, or
              other material that is malicious or technologically harmful;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              6. Attempt to gain unauthorized access to, interfere with, damage,
              or disrupt any parts of the Website, the server on which the
              Website is stored, or any server, computer, or database connected
              to the Website;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              7. Attack the Website via a denial-of-service attack or a
              distributed denial-of-service attack;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              8. Otherwise attempt to interfere with the proper working of the
              Website.
            </p>
            <h2>Content Standards</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              These content standards apply to any and all User Contributions
              and use of Interactive Services. User Contributions must in their
              entirety comply with all applicable central, federal, state,
              local, and international laws and regulations. Without limiting
              the foregoing, User Contributions must not:
            </p>
            <br />
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              1. Contain any material that is defamatory, obscene, indecent,
              abusive, offensive, harassing, violent, hateful, hurtful,
              inflammatory, or otherwise objectionable;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              2. Promote sexually explicit or pornographic material, violence,
              or discrimination based on race, sex, religion, nationality,
              disability, sexual orientation, or age;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              3. Infringe any patent, trademark, trade secret, copyright, or
              other intellectual property or other rights of any other person
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              4. Contain images or videos of persons without such person’s
              consent;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              5. Be likely to deceive any person;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              6. Promote any illegal activity, or advocate, promote, or assist
              any unlawful act;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              7. Cause annoyance, inconvenience, or needless anxiety or be
              likely to upset, embarrass, alarm, or annoy any other person;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              8. Impersonate any person or misrepresent your identity or
              affiliation with any person or organization;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              9. Involve commercial activities or sales, such as contests,
              sweepstakes, and other sales promotions, barter, or advertising;
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              10. Give the impression that they emanate from or are endorsed by
              us or any other person or entity, if this is not the case.
            </p>
            <h2>Copyright Infringement</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              If you believe that any User Contributions violate your copyright,
              please send us a notice of copyright infringement at our address
              specified for contacting us. It is the policy of the Company to
              terminate the user accounts of infringers and remove infringing
              materials.
            </p>
            <h2>TERMS OF DONATIONS</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              Donations made and transactions performed through our Website are
              governed by the terms set forth herein and elsewhere in these
              Terms of Use. Donors may make contributions towards any Campaign
              on the Website provided such donation is in compliance with Indian
              law, and applicable laws in the jurisdiction of the Donor.
            </p>
            <h2>Geographic Restrictions</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              The owner of the Website is based in India. While we endeavor to
              provide this Website for use by persons in India and outside it,
              we make no claims that the Website or any of its content is
              accessible or appropriate outside India. Access to the Website may
              not be legal by certain persons or in certain countries. If you
              access the Website from outside India, you do so on your own
              initiative and are responsible for compliance with local laws.
            </p>
            <h2>Limitation on Liability</h2>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE
              COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS,
              EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF
              ANY KIND, UNDER ANY LEGAL OR EQUITABLE THEORY, ARISING OUT OF OR
              IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY
              WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER
              WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO,
              PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF
              REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS,
              LOSS OF PROFIT, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND
              WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT,
              OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              The limitation of liability set out above does not apply to
              liability resulting from our gross negligence or willful
              misconduct.
            </p>
            <p className="m-0" style={{ fontSize: "14px", textAlign: "left" }}>
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>
            <br />
            <a
              href={"/Declaration/"+studentid}
              className="button button-primary button-wide-mobile button-sm"
              style={{
                backgroundColor: "#f1b12a",
                margin: "1%",
                borderRadius: "20px",
              }}
            >
              Accept
            </a>
            <a
              href={"/Profile/"+studentid}
              className="button button-primary button-wide-mobile button-sm"
              style={{
                backgroundColor: "#f1b12a",
                margin: "1%",
                borderRadius: "20px",
              }}
            >
              Cancel
            </a>
          </center>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
