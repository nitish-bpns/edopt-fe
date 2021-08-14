import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
import LayoutDonor from "./layouts/LayoutDonor";
import LayoutStudent from "./layouts/LayoutStudent";
import LayoutAdmin from "./layouts/LayoutAdmin";

// Views
import Home from "./views/Home";
import LoginDonor from "./views/LoginDonor";
import SignupDonor from "./views/SignupDonor";
import Dash1Donor from "./views/DashboardprimaryDonor";
import Dash2Donor from "./views/DashboardsecondaryDonor";
import Dash3Donor from "./views/DashboardtertiaryDonor";
import Dash4Donor from "./views/DashboardquaternaryDonor";
import NewsDonor from "./views/News";
import FeedDonor from "./views/Feed";
import Terms from "./views/Terms";
import Pay from "./views/Pay";
import Declaration from "./views/Declaration";
import Profile from "./views/profile";
import LoginStudent from "./views/LoginStudent";
import SignupStudent from "./views/SignupStudent";
import Dash1Student from "./views/DashboardprimaryStudent";
import features from "./views/features";
import profile2 from "./views/Profile2";
import approval from "./views/approval";
import require_amt from "./views/require_amt";
import payment_history from "./views/payment_history";
import CreateNewPass from "./components/sections/CreateNewPass";
import ForgetPass from "./components/sections/ForgetPass";
import AboutUs from "./views/About_us";
import VerifyStudent from "./components/sections/verifyStudent";
import VerifiedStudent from "./components/sections/verifiedStudent";
import Admin from "./components/sections/admin";
import AdminLogin from "./components/sections/adminLogin";
import StudentUpdate from "./components/sections/studentUpdate";
// import NewFeed from "./components/sections/NewFeed";
import Sakshi from "./components/sections/sakshi";
import Diya from "./components/sections/diya";
import Jatin from "./components/sections/jatin";
import MyFeeds from "./components/sections/myfeeds";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute
            exact
            path="/Login_Donor"
            component={LoginDonor}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Signup_Donor"
            component={SignupDonor}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Dashboard1_Donor"
            component={Dash1Donor}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/Dashboard2_Donor"
            component={Dash2Donor}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/Dashboard3_Donor"
            component={Dash3Donor}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/Dashboard4_Donor"
            component={Dash4Donor}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/News_Donor"
            component={NewsDonor}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Feed_Donor"
            component={FeedDonor}
            layout={LayoutDefault}
          />
          {/* <AppRoute
            exact
            path="/NewFeed"
            component={NewFeed}
            layout={LayoutDefault}
          /> */}
          <AppRoute
            exact
            path="/Terms"
            component={Terms}
            layout={LayoutDefault}
          />
          <AppRoute exact path="/Pay" component={Pay} layout={LayoutDefault} />
          <AppRoute
            exact
            path="/features"
            component={features}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Profile2"
            component={profile2}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/approval"
            component={approval}
            layout={LayoutAdmin}
          />
          <AppRoute
            exact
            path="/requireamt"
            component={require_amt}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/paymenthistory"
            component={payment_history}
            layout={LayoutAdmin}
          />
          <AppRoute
            exact
            path="/Declaration"
            component={Declaration}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Profile"
            component={Profile}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Login_Student"
            component={LoginStudent}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Signup_Student"
            component={SignupStudent}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Dashboard1_Student"
            component={Dash1Student}
            layout={LayoutStudent}
          />

          <AppRoute
            exact
            path="/Profile/:userId"
            component={Profile}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/Profile1/:userId"
            component={Profile}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/CreateNewPass"
            component={CreateNewPass}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/ForgetPass"
            component={ForgetPass}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/About_us"
            component={AboutUs}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Myfeeds"
            component={MyFeeds}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Terms/:userId"
            component={Terms}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/Declaration/:userId"
            component={Declaration}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/Pay/:userId"
            component={Pay}
            layout={LayoutDonor}
          />
          <AppRoute
            exact
            path="/Feed_Donor/:pgno"
            component={FeedDonor}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/sakshi"
            component={Sakshi}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/diya"
            component={Diya}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/Jatin"
            component={Jatin}
            layout={LayoutDefault}
          />

          <AppRoute
            exact
            path="/VerifyStudent"
            component={VerifyStudent}
            layout={LayoutAdmin}
          />
          <AppRoute
            exact
            path="/VerifiedStudent"
            component={VerifiedStudent}
            layout={LayoutAdmin}
          />
          <AppRoute
            exact
            path="/Admin"
            component={Admin}
            layout={LayoutAdmin}
          />
          <AppRoute
            exact
            path="/AdminLogin"
            component={AdminLogin}
            layout={LayoutAdmin}
          />
          <AppRoute
            exact
            path="/StudentUpdate/:userid"
            component={StudentUpdate}
            layout={LayoutAdmin}
          />
        </Switch>
      )}
    />
  );
};

export default App;
