import React from "react";
// import sections
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";
import StudentUpdate from "../components/sections/studentUpdate";

const Home = (props) => {
  return (
    <>
      <br />
      <StudentUpdate  {...props} className="illustration-section-01" />
      <br />
      <br />
    </>
  );
};

export default Home;
