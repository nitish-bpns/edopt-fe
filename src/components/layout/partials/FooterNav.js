import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { x } from '../../sections/Hero';
import SimpleReactFooter from "simple-react-footer";
console.log(`${x}`)


const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  const { t } = useTranslation();

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <Link to="#0">{t('key3')}</Link>
        </li>
        <li>
          <Link to="/Feed_Donor">{t('key4')}</Link>
        </li>
        <li>
          <Link to="/News_Donor">{t('key5')}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;