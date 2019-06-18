import React from 'react';
import styles from './Navbar.module.css'

import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={`${styles.NavbarWrapper} largeScreenResize`}>
      <div className={`${styles.Navbar} resizeInner`}>
        <h1 className={styles.h1}>Board Game Factoids</h1>
        <div className={styles.linksWrapper}>
          <NavLink to='/cards' className='btn blue'>View All Cards</NavLink>
          <NavLink to='/cards/new' className='btn blue'>Add a New Card</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;