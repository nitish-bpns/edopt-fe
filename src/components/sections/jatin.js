import React, { useState } from "react";
//import "./styles.css";
var FontAwesome = require("react-fontawesome");

function openForm() {
  document.getElementById("popupForm").style.display = "block";
  document.getElementById("blur").style.filter = "blur(4px)";
  /* document.getElementById("fix-btn").style.display = "none"; */
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("blur").style.filter = "blur(0px)";
  /* document.getElementById("fix-btn").style.display = "block"; */
}

function openImage() {
  document.getElementsByClassName("prsnl-photo-popup")[0].style.display =
    "block";
  document.getElementById("img-popup").style.display = "block";
  document.getElementById("blur").style.filter = "blur(4px)";
  // document.getElementById("fix-btn").style.display = "none";
}
function closeImage() {
  document.getElementsByClassName("prsnl-photo-popup")[0].style.display =
    "none";
  document.getElementById("img-popup").style.display = "none";
  document.getElementById("blur").style.filter = "blur(0px)";
  //document.getElementById("fix-btn").style.display = "block";
}

export default function Contact() {
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
        "https://v1.nocodeapi.com/eedopt/google_sheets/EJbzyRDJOnoGsbzb?tabId=eDOPT",
        {
          method: "post",
          body: JSON.stringify([
            [formData.name, formData.email, formData.phone, formData.location],
          ]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      console.log("Success:", JSON.stringify(json));
      setMessage("Success");
      alert("Form Submitted Successfully");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error");
    }
  };

  return (
    <div
      style={{
        marginTop: "100px",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div id="blur">
        <div className="stud-video">
          <video
            id="stu-video"
            style={{ margin: "auto" }}
            poster={require("./../../assets/images/jatin-img.jpg")}
            width="45%"
            autoPlay
            controls
            preload="none"
          >
            <source
              src={require("./../../assets/images/jatin-vid.mp4")}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div id="fix-btn" onClick={openForm}>
          Contact Now
        </div>

        <div className="brief" style={{ width: "90%", margin: "auto" }}>
          <h3>Brief</h3>
          <p
            style={{
              color: "#484444",
              fontWeight: "500",
            }}
          >
            I am Jatin. I am a student of class 9th. I want to pursue
            Non-medical. I love dancing. I am very bright in studies and very
            much interested in studies. My mother is a single parent.
          </p>
          <p
            style={{
              color: "#484444",
              fontWeight: "500",
            }}
          >
            I hereby bring to your notice that there is a legal dispute going on
            in between my parents which affects my studies emotionally as well
            as financially. My mother take care of me and my sister. This is a
            tough time for us, as my mother work due to her health issues.
            Financial condition of my family is not good as there is no source
            of income because of this it is difficult for me to complete my
            education and achieve my goals. I have no resources for my studies.
            I need guidance and financial support to complete my studies. I
            assure you to work very hard for my goals. I am grateful to one who
            help me to reach my goals.
          </p>
        </div>
        <div className="detail" style={{ width: "90%", margin: "auto" }}>
          <h3>Details</h3>
          <p
            style={{
              color: "#484444",
              fontWeight: "500",
            }}
          >
            <ul>
              <li>Name: Jatin Arora</li>
              <li>Location: Karnal</li>
              <li>Age: 15</li>
              <li>School: Gyan Ganga Montessori & Model School</li>
            </ul>
          </p>
        </div>
        <div className="achievement" style={{ width: "90%", margin: "auto" }}>
          <h3>Achievements</h3>
          <p
            style={{
              color: "#484444",
              fontWeight: "500",
            }}
          >
            <ul>
              <li> 96% in 8th class</li>
              <li>Class Topper</li>
            </ul>
          </p>
        </div>
        <div className="certificate" style={{ width: "90%", margin: "auto" }}>
          <h3>Certificates</h3>
          <img
            src={require("./../../assets/images/jatin-mark.jpg")}
            alt=""
            onClick={openImage}
            className="prsnl-photo"
          />
        </div>

        <div className="amount" style={{ width: "90%", margin: "auto" }}>
          <h3>Amount</h3>

          <p
            style={{
              color: "#484444",
              fontWeight: "500",
            }}
          >
            ₹90,000/Year
          </p>
        </div>
        <br />
        <br />
      </div>
      <div>
        {/* image popup */}
        <div id="img-popup">
          <img
            src={require("./../../assets/images/jatin-mark.jpg")}
            alt=""
            onClick={closeImage}
            className="prsnl-photo-popup"
          />
        </div>
        {/* image popup */}

        {/* form */}
        <div class="contactPopup">
          <div class="formPopup" id="popupForm">
            <h3 className="form-head">Contact Us</h3>
            <FontAwesome
              className="form-icon cancel"
              name="times"
              onClick={closeForm}
            />
            <hr className="line" />
            <form className="formContainer input-form" onSubmit={sendData}>
              <div>
                <input
                  type="text"
                  className="form-field"
                  id="name"
                  placeholder="Name"
                  name="name"
                  required
                  onChange={handleInput}
                />
                <FontAwesome className="form-icon" name="user" />
              </div>
              <div>
                <input
                  type="email"
                  className="form-field"
                  id="email"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={handleInput}
                />
                <FontAwesome className="form-icon" name="envelope" />
              </div>
              <div>
                <input
                  type="tel"
                  className="form-field"
                  id="phone"
                  placeholder="Phone"
                  name="phone"
                  pattern="[0-9]{10}"
                  required
                  onChange={handleInput}
                />
                <FontAwesome className="form-icon" name="phone" />
              </div>
              <div>
                <input
                  type="text"
                  className="form-field"
                  id="location"
                  placeholder="Location"
                  name="location"
                  required
                  onChange={handleInput}
                />
                <FontAwesome className="form-icon" name="map-marker" />
              </div>
              <input name="submit" className="btn" type="submit" value="Send" />
              <div>{message}</div>
            </form>
          </div>
        </div>
        {/* form */}
      </div>
    </div>
  );
}
