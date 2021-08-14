import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import Profile from '../components/sections/profile';

const Home = (props) => {

  return (
    <>
    <br/>
    <br/>
    <br/>
    <Profile {...props} className="illustration-section-01"/>
    <br/>
    <br/>

    </>
  );
}

export default Home;