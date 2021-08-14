import React, {useState} from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );
  

  const sectionHeader = {
    title: "",
    paragraph: "-"
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
      
        <div className={innerClasses}>
        <Carousel responsive={responsive} style={{alignItems:"center", marginTop:"5%"}}>
                <div>
                <center>
                <Image
                  src={require('./../../assets/images/i1.jpg')}
                  alt="Features split 03"
                  style={{width:"50%"}}
                />
                <p style={{fontSize:"14px", marginTop:"2%"}}>Ankit Mishra<br/>Age: 15<br/>City: Faridabad<br/></p>
                <a href="/Profile" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", borderRadius:"20px", marginTop:"2%"}}>Read More</a>
                </center>
                </div>
                <div>
                <center>
                <Image
                  src={require('./../../assets/images/i2.jpg')}
                  alt="Features split 03"
                  style={{width:"50%"}}
                />
                <p style={{fontSize:"14px", marginTop:"2%"}}>Palkit Mishra<br/>Age: 17<br/>City: Faridabad<br/></p>
                
                <a href="/Profile" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", borderRadius:"20px", marginTop:"2%"}}>Read More</a>
                </center>
                </div>
                <div>
                <center>
                <Image
                  src={require('./../../assets/images/i3.jpg')}
                  alt="Features split 03"
                  style={{width:"50%"}}
                />
                <p style={{fontSize:"14px", marginTop:"2%"}}>Ankita Mishra<br/>Age: 16<br/>City: Faridabad<br/></p>
                <a href="/Profile" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", borderRadius:"20px", marginTop:"2%"}}>Read More</a>
                </center>
                </div>
                {/* <div>
                <center>
                <Image
                  src={require('./../../assets/images/p3.png')}
                  alt="Features split 03"
                  style={{width:"50%"}}
                />
                <a href="/Profile" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", borderRadius:"20px", marginTop:"2%"}}>Read More</a>
                </center>
                </div>
                <div>
                <center>
                <Image
                  src={require('./../../assets/images/p3.png')}
                  alt="Features split 03"
                  style={{width:"50%"}}
                />
                <a href="/Profile" className="button button-primary button-wide-mobile button-sm" style={{backgroundColor:"#3d946e", borderRadius:"20px", marginTop:"2%"}}>Read More</a>
                </center>
                </div> */}
            </Carousel>
            <br/><br/>
          <SectionHeader data={sectionHeader} className="center-content">
            <h2>How we work</h2>
            <p>We provide a one to one give and take method so you can know everything about your impact.</p>
          </SectionHeader>
          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16" style={{backgroundColor:"#3d946e"}}>
                    <Image
                      src={require('./../../assets/images/x1.jpg')}
                      alt="Features tile icon 01"
                      width={100}
                      height={100} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Select
                    </h4>
                  {/* <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p> */}
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16" style={{backgroundColor:"#3d946e"}}>
                    <Image
                      src={require('./../../assets/images/x2.jpg')}
                      alt="Features tile icon 02"
                      width={100}
                      height={100} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Interact
                    </h4>
                  {/* <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p> */}
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16" style={{backgroundColor:"white"}}>
                    <Image
                      src={require('./../../assets/images/x7.png')}
                      alt="Features tile icon 03"
                      width={135}
                      height={135} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Plan
                    </h4>
                  {/* <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p> */}
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16" style={{backgroundColor:"#3d946e"}}>
                    <Image
                      src={require('./../../assets/images/x4.jpg')}
                      alt="Features tile icon 04"
                      width={100}
                      height={100} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Pay
                    </h4>
                  {/* <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p> */}
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16" style={{backgroundColor:"#3d946e"}}>
                    <Image
                      src={require('./../../assets/images/x5.jpg')}
                      alt="Features tile icon 05"
                      width={100}
                      height={100} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Get monthly reports
                    </h4>
                  {/* <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p> */}
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16" style={{backgroundColor:"#3d946e"}}>
                    <Image
                      src={require('./../../assets/images/x6.jpg')}
                      alt="Features tile icon 06"
                      width={100}
                      height={100} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                  Build personal connection
                    </h4>
                  {/* <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p> */}
                </div>
              </div>
            </div><br/><br/>
            <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800" style={{alignItems:"center", margin:"5% 0%"}}>
            <a
              data-video="https://www.youtube.com/embed/BtDFLi2vDcY"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/sup.png')}
                alt="Hero"
                width={550}
                height={504}
                style={{borderRadius:"5%"}}/>
            </a>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://www.youtube.com/embed/BtDFLi2vDcY"
            videoTag="iframe" />
          </div>
        </div>
      </div>
     
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;