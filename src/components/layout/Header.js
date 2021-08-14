import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, Redirect } from "react-router-dom";
import Logo from "./partials/Logo";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import './style.css'
import axios from "../../api/axios";

/*i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      English: {
        translation: {
          key: "Hero",
          key1: "Be a",
          key2: "Virtually Adopt a Child For His/Her Education",
          key3: "Home",
          key4: "Feeds",
          key5: "News",
          key6: "Join",
          key7: "Adopt Now",
          key8: "Student",
          key9: "Join Here",
          key10: "Select",
          key11: "Interact",
          key12: "Plan",
          key13: "Pay",
          key14: "Get monthly reports",
          key15: "Build personal connection",
          key16: "How we work",
          key17:
            "We provide a one to one give and take method so you can know everything about your impact.",
          key18: "Impacted Lives",
          key19: "We trust your motive that makes us help you impact lives.",
          key20: "Why us",
          key21:
            "We let you know how your donation money is used in the welfare of children and helps you build a personal connection.",
          key22: "Want To Be A Hero?",
          key23: "Signup As a Donor",
          key24: "Login As a Donor",
          key25: "Signup As a Student",
          key26: "Login As a Student",
          key27: "Signup",
          key28: "Login",
          key29: "Already Have an Account?",
          key30: "Don't Have an Account?",
          key31: "Dashboard",
          key32: "Logout",
          key33: "Made by eDOPT. All right reserved",
          key34: "Checkout our news to know more about it",
          key35: "Checkout our feeds to know more about students",
          key36: "Start a Fundraiser",
          key37: "eDOPT a Child",
          key38: "About Us",
          key39: "Team eDOPT",
          key40: "In The News",
          key41: "Our Partners",
          key42: "Careers",
          key43: "eDOPT Blog",
          key44: "Success Stories",
          key45:"Support",
          key46:"Medical Finance",
          key47:"FAQs & Help Center",
          key48:"Fundraising Tips",
          key49:"Fundraiser Video",
          key50:"Trust & Safety",
          key51:"Plans & Pricing",
          key52:"Contact Us",
          key53:"For Any Queries",
          key54:"Email",
          key55:"Contact No"
        },
      },
      Hindi: {
        translation: {
          key: "नायक",
          key1: "बनें",
          key2: "एक बच्चे को उसकी शिक्षा के लिए मदद करें",
          key3: "होमपेज",
          key4: "फ़ीड",
          key5: "समाचार",
          key6: "रजिस्टर करें",
          key7: "अब अपनाये",
          key8: "छात्र",
          key9: "यहाँ शामिल होएं",
          key10: "चुनते हैं",
          key11: "सहभागिता",
          key12: "योजना",
          key13: "वेतन",
          key14: "मासिक रिपोर्ट प्राप्त करें",
          key15: "व्यक्तिगत संबंध बनाएं",
          key16: "हम कैसे काम करते हैं",
          key17:
            "हम एक से एक देने और लेने की विधि प्रदान करते हैं ताकि आप अपने प्रभाव के बारे में सब कुछ जान सकें",
          key18: "प्रभावित जीवन",
          key19:
            "हमें आपके मकसद पर भरोसा है जो हमें जीवन को प्रभावित करने में आपकी मदद करता है",
          key20: "हम क्यों",
          key21:
            "हम आपको बताते हैं कि आपके दान के पैसे का उपयोग बच्चों के कल्याण में कैसे किया जाता है और आपको व्यक्तिगत संबंध बनाने में मदद करता है",
          key22: "नायक बनना चाहते हैं?",
          key23: "साइनअप डोनर",
          key24: "लॉगिन डोनर",
          key25: "साइनअप छात्र",
          key26: "लॉगिन छात्र",
          key27: "साइनअप",
          key28: "लॉगिन",
          key29: "पहले से ही एक खाता है?",
          key30: "खाता नहीं है?",
          key31: "डैशबोर्ड",
          key32: "लॉग आउट",
          key33: "eDOPT द्वारा किया गया। सर्वाधिकार सुरक्षित",
          key34: "इसके बारे में अधिक जानने के लिए हमारी खबर देखें",
          key35: "छात्रों के बारे में अधिक जानने के लिए हमारे फ़ीड देखें",
          key36: "एक अनुदान संचय शुरू करें",
          key37: "एक बच्चा eDOPT करें",
          key38: "हमारे बारे में",
          key39: "टीम eDOPT",
          key40: "खबर में",
          key41: "हमारे सहयोगियों",
          key42: "करियर",
          key43: "ईडीओपीटी ब्लॉग",
          key44: "सफलता की कहानियां",
          key45:"सहयोग",
          key46:"चिकित्सा वित्त",
          key47:"अक्सर पूछे जाने वाले प्रश्न और सहायता केंद्र",
          key48:"धन उगाहने वाले टिप्स",
          key49:"अनुदान संचय वीडियो",
          key50:"विश्वास और सुरक्षा",
          key51:"योजनाएं और मूल्य निर्धारण",
          key52:"संपर्क करें",
          key53:"किसी भी प्रश्न के लिए",
          key54:"ईमेल",
          key55:"संपर्क नंबर"
        },
      },
      hindi: {
        translation: {
          key: "नायक",
          key1: "बनें",
          key2: "एक बच्चे को उसकी शिक्षा के लिए मदद करें",
          key3: "होमपेज",
          key4: "फ़ीड",
          key5: "समाचार",
          key6: "रजिस्टर करें",
          key7: "अब अपनाये",
          key8: "छात्र",
          key9: "यहाँ शामिल होएं",
          key10: "चुनते हैं",
          key11: "सहभागिता",
          key12: "योजना",
          key13: "वेतन",
          key14: "मासिक रिपोर्ट प्राप्त करें",
          key15: "व्यक्तिगत संबंध बनाएं",
          key16: "हम कैसे काम करते हैं",
          key17:
            "हम एक से एक देने और लेने की विधि प्रदान करते हैं ताकि आप अपने प्रभाव के बारे में सब कुछ जान सकें",
          key18: "प्रभावित जीवन",
          key19:
            "हमें आपके मकसद पर भरोसा है जो हमें जीवन को प्रभावित करने में आपकी मदद करता है",
          key20: "हम क्यों",
          key21:
            "हम आपको बताते हैं कि आपके दान के पैसे का उपयोग बच्चों के कल्याण में कैसे किया जाता है और आपको व्यक्तिगत संबंध बनाने में मदद करता है",
          key22: "नायक बनना चाहते हैं?",
          key23: "साइनअप डोनर",
          key24: "लॉगिन डोनर",
          key25: "साइनअप छात्र",
          key26: "लॉगिन छात्र",
          key27: "साइनअप",
          key28: "लॉगिन",
          key29: "पहले से ही एक खाता है?",
          key30: "खाता नहीं है?",
          key31: "डैशबोर्ड",
          key32: "लॉग आउट",
          key33: "eDOPT द्वारा किया गया। सर्वाधिकार सुरक्षित",
          key34: "इसके बारे में अधिक जानने के लिए हमारी खबर देखें",
          key35: "छात्रों के बारे में अधिक जानने के लिए हमारे फ़ीड देखें",
          key36: "एक अनुदान संचय शुरू करें",
          key37: "एक बच्चा eDOPT करें",
          key38: "हमारे बारे में",
          key39: "टीम eDOPT",
          key40: "खबर में",
          key41: "हमारे सहयोगियों",
          key42: "करियर",
          key43: "ईडीओपीटी ब्लॉग",
          key44: "सफलता की कहानियां",
          key45:"सहयोग",
          key46:"चिकित्सा वित्त",
          key47:"अक्सर पूछे जाने वाले प्रश्न और सहायता केंद्र",
          key48:"धन उगाहने वाले टिप्स",
          key49:"अनुदान संचय वीडियो",
          key50:"विश्वास और सुरक्षा",
          key51:"योजनाएं और मूल्य निर्धारण",
          key52:"संपर्क करें",
          key53:"किसी भी प्रश्न के लिए",
          key54:"ईमेल",
          key55:"संपर्क नंबर"
          
        },
      },
    },
    lng: `${x}`,
    fallbackLng: "English",

    interpolation: {
      escapeValue: false,
    },
  });*/

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

const Header = ({
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

  //const { t, i18n } = useTranslation();

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
  const [log, setLog] = useState(false)

  useEffect(() => {
    axios.get('/isloggedin', { headers: { email: email }, withCredentials: true })
      .then((response) => {
        console.log(response.data)
        if (response.data.status) { setLog(true) }
        else { setLog(false) }

      }).catch((err) => {
        setLog(false)
      })
  }, []);
  const [redirecthome, setRedirectHome] = useState(false)
  const logouthandler = (e) => {
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    axios.get('/logout', { withCredentials: true })
      .then((response) => {
        setRedirectHome(true)
      })
  }

  if (redirecthome) {
    return (<Redirect to={{ pathname: "/Login_Donor", state: { 'redirected': true } }} />)
  }

  if (log) {
    return (
      <header {...props} className={classes}>
        <div className="container">
          <div
            className={classNames(
              "site-header-inner",
              bottomDivider && "has-bottom-divider"
            )}
          >
            <Logo />
            {!hideNav && (
              <>
                <button
                  ref={hamburger}
                  className="header-nav-toggle"
                  onClick={isActive ? closeMenu : openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
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
                            to="/Dashboard1_Donor"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={closeMenu}
                            style={{
                              backgroundColor: "#f1b12a",
                              borderRadius: "5px",
                            }}
                          >
                            Dashboard
                          </Link>
                        </li>

                        <li>
                          <button
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
  }
  else {

    return (
      <header {...props} className={classes}>
        <div className="container">
          <div
            className={classNames(
              "site-header-inner",
              bottomDivider && "has-bottom-divider"
            )}
          >
            <Logo />
            {!hideNav && (
              <>
                <button
                  ref={hamburger}
                  className="header-nav-toggle"
                  onClick={isActive ? closeMenu : openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
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
                            to="/Signup_Student"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={closeMenu}
                            style={{
                              backgroundColor: "#3a936c",
                              borderRadius: "5px",
                            }}
                          >
                            For Student
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            to="/Feed_Donor/1"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={closeMenu}
                            style={{
                              backgroundColor: "#3a936c",
                              borderRadius: "5px",
                            }}
                          >
                            eDOPT a Child
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            to="/Login_Donor"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={closeMenu}
                            style={{
                              backgroundColor: "#ffffff",
                              borderRadius: "5px",
                              borderColor: "#3a936c",
                              color: "#3a936c",
                            }}
                          >
                            Login/Signup
                          </Link>
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

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
