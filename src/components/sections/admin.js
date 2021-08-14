//import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Image from "../elements/Image";
import "./style.css";

const Admin = (props) => {
  function getCookie(name) {
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookieValue = 0
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const [email, setEmail] = useState(getCookie('email'))
  const [redirecthome, setRedirectHome] = useState(false)
  useEffect(() => {
    if (email == 0 || email == 'undefined') {
      setRedirectHome(true)
    }
  }, [])

  if (redirecthome) {
    return (<Redirect to={{ pathname: "/AdminLogin", state: {} }} />)
  }


  return (
    <div className="admin" style={{ marginTop: "100px", marginBottom: "50px" }}>
      <hr />
      <div className="nav-links">
        <h6 className="nav-head" style={{ color: "black" }}>
          {" "}
          Verify Student{" "}
        </h6>
        <Link
          to="/VerifyStudent"
          className="button admin-nav button-primary button-wide-mobile button-sm"
          onClick=""
          style={{ backgroundColor: "#f1b12a", borderRadius: "20px" }}
        >
          Click Here
        </Link>
        <h6 className="nav-head" style={{ color: "black" }}>
          {" "}
          Verified Student{" "}
        </h6>
        <Link
          to="/VerifiedStudent"
          className="button admin-nav button-primary button-wide-mobile button-sm"
          onClick=""
          style={{ backgroundColor: "#f1b12a", borderRadius: "20px" }}
        >
          Click Here
        </Link>
        <h6 className="nav-head" style={{ color: "black" }}>
          {" "}
          Approval{" "}
        </h6>
        <Link
          to="/approval"
          className="button admin-nav button-primary button-wide-mobile button-sm"
          onClick=""
          style={{ backgroundColor: "#f1b12a", borderRadius: "20px" }}
        >
          Click Here
        </Link>
        <h6 className="nav-head" style={{ color: "black" }}>
          {" "}
          Update Amount Required{" "}
        </h6>
        <Link
          to="/requireamt"
          className="button admin-nav button-primary button-wide-mobile button-sm"
          onClick=""
          style={{ backgroundColor: "#f1b12a", borderRadius: "20px" }}
        >
          Click Here
        </Link>
      </div>
      <div className="logo-image">
        <Image
          src={require("./../../assets/images/eDOPT.png")}
          alt="Features split 01"
          width={528}
          height={396}
        />
      </div>
    </div>
  );
}
export default Admin