import React from "react";
import Button from "../elements/Button";

function sortLocation() {
  var input, filter, cards, loc, i, txtValue;

  input = document.getElementById("sort-location");
  filter = input.value.toUpperCase();

  cards = document.getElementsByClassName("myCard");
  for (i = 0; i < cards.length; i++) {
    loc = cards[i].getElementsByClassName("stud-location")[0];
    txtValue = loc.textContent || loc.innerText;
    if (filter == "") {
      cards[i].style.display = "";
    } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function sortName() {
  var input, filter, cards, myname, i, txtValue;

  input = document.getElementById("sort-name");
  filter = input.value.toUpperCase();
  cards = document.getElementsByClassName("myCard");
  for (i = 0; i < cards.length; i++) {
    myname = cards[i].getElementsByClassName("stud-name")[0];

    txtValue = myname.textContent || myname.innerText;

    if (filter == "") {
      cards[i].style.display = "";
    } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

export default function myfeeds() {
  return (
    <div
      style={{
        marginTop: "85px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Student Feeds</h3>
      <hr />
      <div className="sorting">
        <p style={{ display: "inline-block", margin: "0 47px" }}>Sort By </p>
        <input
          type="text"
          id="sort-location"
          onKeyUp={sortLocation}
          placeholder="Location"
          title="Type in a Location"
        />
        <input
          type="text"
          id="sort-name"
          onKeyUp={sortName}
          placeholder="Name"
          title="Type in a Name"
        />
      </div>
      <hr />
      <br />
      <div className="feed-content">
        <div className="myCard">
          <div className="student-img">
            <img
              src={require("./../../assets/images/sakshi-img.jpg")}
              alt=""
              className="photo"
            /* style={{ height: "140px" }} */
            />
          </div>
          <div className="student-details">
            <p className="stud-name">Sakshi</p>
            <p className="stud-age">Age: 6</p>
            <p className="stud-location">Delhi</p>
            <p className="stud-goal">Delhi Vidyadeep<br /> Public School </p>
          </div>
          <center>
            <a
              /* tag="a"
              color="primary" */
              href="/sakshi"
              className="edoptbtn"
              style={{ backgroundColor: "#4b5c6b", borderRadius: "5px" }}
            >
              eDOPT
            </a>
          </center>
        </div>
        <div className="myCard">
          <div className="student-img">
            <img
              src={require("./../../assets/images/jatin-img.jpg")}
              alt=""
              className="photo"
            /* style={{ height: "140px" }} */
            />
          </div>
          <div className="student-details">
            <p className="stud-name">Jatin</p>
            <p className="stud-age">Age: 15</p>
            <p className="stud-location">Karnal</p>
            <p className="stud-goal">Gyan Ganga<br /> Montessori School</p>
          </div>
          <center>
            <a
              /* tag="a"
              color="primary" */
              href="/jatin"
              className="edoptbtn"
              style={{ backgroundColor: "#4b5c6b", borderRadius: "5px" }}
            >
              eDOPT
            </a>
          </center>
        </div>
        <div className="myCard">
          <div className="student-img">
            <img
              src={require("./../../assets/images/diya-img.jpg")}
              alt=""
              className="photo"
            /* style={{ height: "140px" }} */
            />
          </div>
          <div className="student-details">
            <p className="stud-name">Diya</p>
            <p className="stud-age">Age: 15</p>
            <p className="stud-location">Sonipat</p>
            <p className="stud-goal">Holy Child Senior <br />Secondary School</p>
          </div>
          <div>
            <center>


              <a
                /* tag="a"
              color="primary" */
                href="/diya"
                className="edoptbtn"
                style={{ backgroundColor: "#4b5c6b", borderRadius: "5px" }}
              >
                eDOPT
              </a>
            </center>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
