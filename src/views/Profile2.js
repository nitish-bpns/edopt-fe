import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import Profile2 from '../components/sections/profile2';

const Home = (props) => {

  return (
    <>
    <Profile2 {...props} className="illustration-section-01"/>
    </>
  );
}

export default Home;