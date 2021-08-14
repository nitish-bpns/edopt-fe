import React from "react";
var FontAwesome = require("react-fontawesome");

function openForm() {
  document.getElementById("popupForm").style.display = "block";
  document.getElementById("blur").style.filter = "blur(4px)";
  document.getElementById("fix-btn").style.display = "none";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("blur").style.filter = "blur(0px)";
  document.getElementById("fix-btn").style.display = "block";
}

// function SubForm() {
//   $.ajax({
//     url: 'https://docs.google.com/spreadsheets/d/1ZS_5PY4TFpZoh1-xN1rgz8Jp2JLbfRsQoOBEBSxAKQ8/edit?usp=sharing',
//     type: 'post',
//     data: $("#myForm").serializeArray(),
//     success: function () {
//       alert("Form Data Submitted :)")
//     },
//     error: function () {
//       alert("There was an error :(")
//     }
//   });
// }


export default function diya() {
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
            poster={require("./../../assets/images/diya-img.jpg")}
            width="45%"
            controls
            preload="none"
          >
            <source
              src={require("./../../assets/images/diya-vid.mp4")}
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
            I am Diya. I am a student of class 11th. I want to pursue
            Non-medical. I love dancing. I am very bright in studies and very
            much interested in studies. My father runs a small business.
          </p>
          <p
            style={{
              color: "#484444",
              fontWeight: "500",
            }}
          >
            COVID-19 makes our life miserable as one of our family member got
            infected to COVID and later to black fungus. Our family suffered
            alot in this phase. This phase makes us financially weak that we
            can't able to pay our educational expenses. This is tough time for
            us, so i request you to please support us financially in this phase.
            I want to do engineering and achieve my goals. I will be grateful to
            the one who supports me incessantly.
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
              <li>Name: Diya</li>
              <li>Location: Sonipat</li>
              <li>Age: 15</li>
              <li>Engineering</li>
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
              <li>93% in informatic Tech</li>
            </ul>
          </p>
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
            <form action="/action_page.php" class="formContainer">
              <div>
                <input
                  type="text"
                  className="form-field"
                  id="name"
                  placeholder="Name"
                  name="name"
                  required
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
                />
                <FontAwesome className="form-icon" name="map-marker" />
              </div>
              <button type="submit" class="btn">
                Confirm
              </button>
            </form>
          </div>
        </div>
        {/* form */}
      </div>
    </div>
  );
}
