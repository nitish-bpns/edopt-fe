import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link,Redirect } from "react-router-dom";
import Logo from "./partials/Logo";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import "./style.css";
import axios from "../../api/axios";

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const AdminHeader = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );


  const [redirecthome,setRedirectHome]=useState(false)
  const logouthandler=(e)=>{
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    axios.get('/logout',{withCredentials:true})
    .then((response)=>{
      setRedirectHome(true)
    })
  }  

  if (redirecthome){
    return(<Redirect to={{pathname:"/AdminLogin",state:{}}} />)
  }
  else{
  return (
    <header {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <h3 style={{ color: "#f1b12a" }}>Admin Panel</h3>
          <Logo />
          {!hideNav && (
            <>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    {/* <li>
                      <Link to="/" onClick={closeMenu}>{t('key3')}</Link>
                    </li>
                    <li>
                      <Link to="/Feed_Donor" onClick={closeMenu}>{t('key4')}</Link>
                    </li>
                    <li>
                      <Link to="/News_Donor" onClick={closeMenu}>{t('key5')}</Link>
                    </li> */}
                  </ul>

                  {!hideSignin && (
                    <ul className="list-reset header-nav-right">
                      <li>
                        <Link
                          to="/Admin"
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={closeMenu}
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "5px",
                            borderColor: "#f1b12a",
                            color: "#f1b12a",
                          }}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <button
                          to="/AdminLogin"
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={logouthandler}
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "5px",
                            borderColor: "#f1b12a",
                            color: "#f1b12a",
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
}
AdminHeader.propTypes = propTypes;
AdminHeader.defaultProps = defaultProps;

export default AdminHeader;
