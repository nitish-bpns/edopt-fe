import React from 'react';
// import sections
import Donorlogin from '../components/sections/Donorlogin';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = (props) => {

  return (
    <>
      <Donorlogin {...props} className="illustration-section-01" />
    </>
  );
}

export default Home;