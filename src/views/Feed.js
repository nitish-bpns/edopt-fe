import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import Feed from '../components/sections/Feeddonor';

const Home = (props) => {

  return (
    <>
    <Feed {...props} className="illustration-section-01"/>
    </>
  );
}

export default Home;