import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import Terms from '../components/sections/Terms';

const Home = (props) => {

  return (
    <>
    <Terms {...props} className="illustration-section-01"/>
    </>
  );
}

export default Home;